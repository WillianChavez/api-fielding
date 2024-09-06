export interface PrimitiveBody {
  id: string;
  name: string;
  value: string;
  requestId: string;
}

export class Body {
  constructor(private attributes: PrimitiveBody) {}

  static create(attributes: PrimitiveBody): Body {
    return new Body(attributes);
  }

  toValue(): PrimitiveBody {
    return this.attributes;
  }
}
