export interface AddVariableDto {
  environmentId: string;
  userId: string;
  variables: {
    id?: string;
    name: string;
    initialValue: string;
    currentValue: string;
    active?: boolean;
  }[];
}
