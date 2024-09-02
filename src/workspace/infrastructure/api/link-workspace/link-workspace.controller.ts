import { LINK_ROUTE, WORKSPACE_ROUTE } from '@/workspace/routes';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  LinkWorkspaceHttpDto,
  LinkWorkspaceQueryHttpDto,
} from './link-workspcae-http.dto';
import { LinkWorkspaceUseCase } from '@/workspace/application/link-workspace-use-case/link-workspace-use-case';
import { EnvConfigService } from '@/shared/config/services/env-config.service';
import { WorkspaceNoExistException } from '@/workspace/domain/exceptions/workspace-no.exist.exception';

@Controller(LINK_ROUTE)
@ApiTags(WORKSPACE_ROUTE)
export class LinkWorkspaceController {
  constructor(
    private readonly linkWorkspaceUseCase: LinkWorkspaceUseCase,
    private readonly envConfigService: EnvConfigService,
  ) {}
  @Get(':workspace')
  async run(
    @Param() linkWorkspaceHttpDto: LinkWorkspaceHttpDto,
    @Query() linkWorkspaceQueryHttpDto: LinkWorkspaceQueryHttpDto,
  ) {
    try {
      const exp = this.envConfigService.vars.expTokenLinkWorkspace;
      const { uri } = linkWorkspaceQueryHttpDto;
      const token = await this.linkWorkspaceUseCase.run({
        ...linkWorkspaceHttpDto,
        exp,
      });

      return {
        message: 'Link generated successfully for guests',
        url: `${this.envConfigService.vars.urlFront}${uri.replace('{token}', token)}`,
      };
    } catch (error) {
      if (error instanceof WorkspaceNoExistException)
        throw new WorkspaceNoExistException(error.message);
      throw new InternalServerErrorException(error);
    }
  }
}
