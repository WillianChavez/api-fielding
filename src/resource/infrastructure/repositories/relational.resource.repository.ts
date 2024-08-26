import { Resource, ResourceType, Request } from '@/resource/domain/entities';
import { ResourceRepository } from '@/resource/domain/respositories';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@shared-dependencies';
import ResourceModel from '../models/resource.model';
import ResourceTypeModel from '../models/resource-type.model';
import RequestModel from '../models/request.model';

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

  async create(resource: Resource): Promise<Resource> {
    const { name, order, resourceType } = resource.toValue();
    const resResourceSaved = await this.resourceModel.create({
      name,
      order,
      resourceTypeId: resourceType.id,
    });

    const newResource = Resource.create({
      id: resResourceSaved.id,
      name: resResourceSaved.name,
      order: resResourceSaved.order,
      resourceType: resourceType,
    });

    return newResource;
  }

  async findResourceTypeById(id: string): Promise<ResourceType | null> {
    const resResourceType = await this.resourceTypeModel.findByPk(id);

    const resourceType = ResourceType.create({
      id: resResourceType.id,
      name: resResourceType.name,
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
    });

    return resource;
  }
  async createRequest(request: Request): Promise<Request> {
    const { resourceId, requestableType } = request.toValue();
    let resRequestSaved;

    switch (requestableType) {
      case 'http-request':
        resRequestSaved = await this.requestModel.create({
          resourceId,
        });
        break;
      default:
        throw new Error('Requestable type not found');
    }

    const newRequest = Request.create({
      id: resRequestSaved.id,
      resourceId: resRequestSaved.resourceId,
      requestableId: resRequestSaved.httpRequestId,
      requestableType,
    });

    return newRequest;
  }
}
