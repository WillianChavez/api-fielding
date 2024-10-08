import { v4 as uuidv4 } from 'uuid';
export interface PrimitiveVariable {
  id: string;
  name: string;
  initialValue: string;
  currentValue?: string;
  globalValue?: string;
  active?: boolean;
}

export class Variable {
  constructor(private attributes: PrimitiveVariable) {}

  static create({
    id,
    name,
    initialValue,
    currentValue,
    globalValue,
    active,
  }: Omit<PrimitiveVariable, 'id'> & { id?: string }): Variable {
    return new Variable({
      id: id ?? uuidv4(),
      name,
      initialValue,
      currentValue,
      globalValue,
      active: active ?? true,
    });
  }

  toValue(): PrimitiveVariable {
    return this.attributes;
  }

  get id(): string {
    return this.attributes.id;
  }
}
