import { Task } from "./Task"

export type CreateTaskDto = Pick<Task, 'name'> & Partial<Task>;