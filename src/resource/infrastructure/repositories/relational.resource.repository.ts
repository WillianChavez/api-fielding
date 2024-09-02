import { Resource, ResourceType, Request } from '@/resource/domain/entities';
import { ResourceRepository } from '@/resource/domain/respositories';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@shared-dependencies';
import ResourceModel from '../models/resource.model';
import ResourceTypeModel from '../models/resource-type.model';
import RequestModel from '../models/request.model';
import { RequestableType } from '@/resource/domain/entities/request.entity';
import { ResourceTypeName } from '@/resource/domain/entities/resource-type.entity';

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
    const filterName = '%' + name + '%';
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
    const { name, order, resourceType, workspaceId } = resource.toValue();
    const resResourceSaved = await this.resourceModel.create({
      name,
      order,
      resourceTypeId: resourceType.id,
      workspaceId,
    });

    const newResource = Resource.create({
      id: resResourceSaved.id,
      name: resResourceSaved.name,
      order: resResourceSaved.order,
      resourceType: resourceType,
      workspaceId,
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
}
