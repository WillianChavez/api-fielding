export interface PrimitiveMethod {
  id: number;
  name: string;
}

export class Method {
  constructor(private attributes: PrimitiveMethod) {}

  static create(attributes: PrimitiveMethod): Method {
    return new Method(attributes);
  }

  toValue(): PrimitiveMethod {
    return this.attributes;
  }
}
