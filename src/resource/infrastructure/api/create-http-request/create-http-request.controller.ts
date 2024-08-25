import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RESOURCE_ROUTE } from '../../routes';

@Controller(RESOURCE_ROUTE)
@ApiTags(RESOURCE_ROUTE)
export class CreateHttpRequestController {}
