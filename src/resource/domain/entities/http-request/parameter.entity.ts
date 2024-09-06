export interface PrimitiveParameter {
  id: string;
  name: string;
  value: string;
  isQueryParam: boolean;
  httpRequestId: string;
}

export class Parameter {
  constructor(private attributes: PrimitiveParameter) {}

  static create(attributes: PrimitiveParameter): Parameter {
    return new Parameter(attributes);
  }

  toValue(): PrimitiveParameter {
    return this.attributes;
  }
}
