export type Report = {
  id: string,
  name: string,
  description: string,
  data: Record<string, any>,
  createdAt: Date,
  updatedAt: Date,
}