export interface PrimitiveHeader {
  id: string;
  name: string;
  value: string;
  httpRequestId: string;
}

export class Header {
  constructor(private attributes: PrimitiveHeader) {}

  static create(attributes: PrimitiveHeader): Header {
    return new Header(attributes);
  }

  toValue(): PrimitiveHeader {
    return this.attributes;
  }
}
