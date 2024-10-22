import './Main.css';
import TaskList from '../TaskList';
import { useEffect, useState } from 'react';
import taskService from 'src/api/tasks';
import { Task } from 'src/types';
import ReportCreationForm from '../ReportCreationForm';
import TaskCreationForm from '../TaskCreationForm';

export default function Main() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskService
      .find()
      .then((result) => {
        setTasks(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleDelete(id: string) {
    taskService
      .remove(id)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });

    setTasks((prev) => {
      return prev.filter((task) => task.id !== id);
    });
  }

  function handleUpdate(id: string, name: string) {
    taskService
      .update(id, { name })
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="main">
      <TaskCreationForm setTasks={setTasks} />
      <ReportCreationForm />
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </main>
  );
}
