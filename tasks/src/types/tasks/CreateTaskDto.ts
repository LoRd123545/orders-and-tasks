import { Task } from "./Task.js"

export type CreateTaskDto = Pick<Task, 'name'> & Partial<Task>;