import { ReactNode } from 'react';
import Task from '../Task';
import { Task as TaskType } from 'src/types';
import './TaskList.css';

export default function TaskList({
  tasks,
  handleDelete,
  handleUpdate,
}: {
  tasks: TaskType[];
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, name: string) => void;
}) {
  const list: ReactNode[] = [];

  for (const task of tasks) {
    list.push(
      <Task
        name={task.name}
        key={task.id}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        id={task.id}
      />
    );
  }

  return <div className="tasks">{list}</div>;
}
