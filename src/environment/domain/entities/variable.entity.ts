import { v4 as uuidv4 } from 'uuid';
export interface PrimitiveVariable {
  id: string;
  name: string;
  initialValue: string;
  currentValue?: string;
  globalValue?: string;
}

export class Variable {
  constructor(private attributes: PrimitiveVariable) {}

  static create({
    id = uuidv4(),
    name,
    initialValue,
    currentValue,
    globalValue,
  }: PrimitiveVariable): Variable {
    return new Variable({ id, name, initialValue, currentValue, globalValue });
  }

  toValue(): PrimitiveVariable {
    return this.attributes;
  }

  get id(): string {
    return this.attributes.id;
  }
}
