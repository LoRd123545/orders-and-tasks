export type Task = {
  id: string;
  name: string;
  description?: string;
  status: string;
  dueTo?: Date;
  createdAt: Date;
  updatedAt: Date;
};
