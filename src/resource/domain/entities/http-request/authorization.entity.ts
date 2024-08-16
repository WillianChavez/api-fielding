export interface PrimitiveAuthorization {
  id: string;
  authorizationTypeId: string;
  description: string;
  httpRequestId: string;
}

export class Authorization {
  constructor(private attributes: PrimitiveAuthorization) {}

  static create(attributes: PrimitiveAuthorization): Authorization {
    return new Authorization(attributes);
  }

  toValue(): PrimitiveAuthorization {
    return this.attributes;
  }
}
