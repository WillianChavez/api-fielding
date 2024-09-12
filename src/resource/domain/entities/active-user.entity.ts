export interface PrimitiveActiveUser {
  id: string;
  name: string;
  urlPhoto: string;
  workspaceId: string;
}

export class ActiveUser {
  constructor(private attributes: PrimitiveActiveUser) {}

  static create({
    id,
    name,
    urlPhoto,
    workspaceId,
  }: PrimitiveActiveUser): ActiveUser {
    return new ActiveUser({ id, name, urlPhoto, workspaceId });
  }

  toValue(): PrimitiveActiveUser {
    return this.attributes;
  }
}
