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
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedAuthorizationType } from './infrastructure/seeders/authorization-type.seed';
import { SeedMethod } from './infrastructure/seeders/method.seed';
import { SeedResourceType } from './infrastructure/seeders/resource-type.seed';

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
    SeederModule.forFeature([
      SeedAuthorizationType,
      SeedMethod,
      SeedResourceType,
    ]),
  ],
})
export class ResourceModule {}
