import { Injectable } from '@/shared/dependencies';

export interface LoginHttpResourceJson {
  token: string;
}

@Injectable()
export class LoginUserResource {
  toJson({ token }: { token: string }): LoginHttpResourceJson {
    return {
      token,
    };
  }
}
