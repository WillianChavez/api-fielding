import { Resource, ResourceType, Request } from '@/resource/domain/entities';
import { ResourceRepository } from '@/resource/domain/respositories';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@shared-dependencies';
import ResourceModel from '../models/resource.model';
import ResourceTypeModel from '../models/resource-type.model';
import RequestModel from '../models/request.model';
import { RequestableType } from '@/resource/domain/entities/request.entity';
import { ResourceTypeName } from '@/resource/domain/entities/resource-type.entity';
import { Op } from 'sequelize';

@Injectable()
export class RelationalResourceRepository extends ResourceRepository {
  constructor(
    @InjectModel(ResourceModel)
    private readonly resourceModel: typeof ResourceModel,

    @InjectModel(ResourceTypeModel)
    private readonly resourceTypeModel: typeof ResourceTypeModel,

    @InjectModel(RequestModel)
    private readonly requestModel: typeof RequestModel,
  ) {
    super();
  }

  async findResourceTypeByName(
    name: ResourceTypeName,
  ): Promise<ResourceType | null> {
    const filterName = name as string;
    const resResourceType = await this.resourceTypeModel.findOne({
      where: { name: filterName },
    });
    const resourceType = ResourceType.create({
      id: resResourceType.id,
      name: resResourceType.name as ResourceTypeName,
    });

    return resourceType;
  }

  async create(resource: Resource): Promise<Resource> {
    const { name, order, resourceType, workspaceId, parentResourceId } =
      resource.toValue();

    const resResourceSaved = await this.resourceModel.create({
      name,
      order,
      resourceTypeId: resourceType.id,
      workspaceId,
      parentResourceId,
    });

    const newResource = Resource.create({
      id: resResourceSaved.id,
      name: resResourceSaved.name,
      order: resResourceSaved.order,
      resourceType: resourceType,
      workspaceId,
      parentResourceId: resResourceSaved.parentResourceId,
    });

    return newResource;
  }

  async findResourceTypeById(id: string): Promise<ResourceType | null> {
    const resResourceType = await this.resourceTypeModel.findByPk(id);

    const resourceType = ResourceType.create({
      id: resResourceType.id,
      name: resResourceType.name as ResourceTypeName,
    });

    return resourceType;
  }
  async findById(id: string): Promise<Resource | null> {
    const resResource = await this.resourceModel.findByPk(id);

    const resourceType = await this.findResourceTypeById(
      resResource.resourceTypeId,
    );

    const resource = Resource.create({
      id: resResource.id,
      name: resResource.name,
      resourceType: resourceType.toValue(),
      order: resResource.order,
      workspaceId: resResource.workspaceId,
    });

    return resource;
  }
  async createRequest<T extends RequestableType>(
    request: Request<T>,
  ): Promise<Request<T>> {
    const { resourceId, requestableId, requestableType } = request.toValue();
    const resRequestSaved = await this.requestModel.create({
      resourceId,
      requestableId,
      requestableType,
    });

    const newRequest = Request.create<typeof requestableType>({
      id: resRequestSaved.id,
      resourceId: resRequestSaved.resourceId,
      requestableId: resRequestSaved.requestableId,
      requestableType: requestableType,
    });

    return newRequest;
  }

  async list(filter: {
    workspaceId: string;
    typesResourceIds?: string[];
  }): Promise<Resource[]> {
    const resResources = await this.resourceModel.findAll({
      where: {
        resourceTypeId: filter?.typesResourceIds,
        workspaceId: filter.workspaceId,
      },
      include: [
        {
          model: ResourceTypeModel,
          as: 'resourceType',
        },
      ],
    });

    const resources = resResources.map((resResource) => {
      return Resource.create({
        id: resResource.id,
        name: resResource.name,
        order: resResource.order,
        workspaceId: resResource.workspaceId,
        parentResourceId: resResource.parentResourceId,
        resourceType: ResourceType.create({
          id: resResource.resourceType.id,
          name: resResource.resourceType.name as ResourceTypeName,
        }).toValue(),
      });
    });

    return resources;
  }

  async listResourcesType(filter: {
    name?: string[];
  }): Promise<ResourceType[]> {
    const resResourceTypes = await this.resourceTypeModel.findAll({
      where: {
        name: {
          [Op.in]: filter.name,
        },
      },
    });

    const resourceTypes = resResourceTypes.map((resResourceType) => {
      return ResourceType.create({
        id: resResourceType.id,
        name: resResourceType.name as ResourceTypeName,
      });
    });

    return resourceTypes;
  }
}
