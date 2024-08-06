export interface CreateWorkspaceDto {
  name: string;
  collaborators: {
    id: string;
    role: string;
  }[];
}
