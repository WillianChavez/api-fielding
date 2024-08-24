import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import ResourceModel from './infrastructure/models/resource.model';
import ResourceTypeModel from './infrastructure/models/resource-type.model';
import AuthorizationModel from './infrastructure/models/authorization.model';
import AuthorizationTypeModel from './infrastructure/models/authorization-type.model';
import BodyModel from './infrastructure/models/body.model';
import HeaderModel from './infrastructure/models/header.model';
import ExtraOptionsModel from './infrastructure/models/extra-options.model';
import RequestModel from './infrastructure/models/request.model';
import MethodModel from './infrastructure/models/method.model';
import ParameterModel from './infrastructure/models/parameter.model';
import HttpRequestModel from './infrastructure/models/http-request.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ResourceModel,
      ResourceTypeModel,
      AuthorizationModel,
      ExtraOptionsModel,
      AuthorizationTypeModel,
      MethodModel,
      RequestModel,
      ParameterModel,
      HttpRequestModel,
      BodyModel,
      HeaderModel,
    ]),
  ],
})
export class ResourceModule {}
