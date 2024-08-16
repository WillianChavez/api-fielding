export interface PrimitiveAuthorizationType {
  id: number;
  name: string;
}

export class AuthorizationType {
  constructor(private attributes: PrimitiveAuthorizationType) {}

  static create(attributes: PrimitiveAuthorizationType): AuthorizationType {
    return new AuthorizationType(attributes);
  }

  toValue(): PrimitiveAuthorizationType {
    return this.attributes;
  }
}
