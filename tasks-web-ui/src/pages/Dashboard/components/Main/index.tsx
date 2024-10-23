import { useEffect, useState } from 'react';

import taskService from 'src/api/tasks';

import { Task } from 'src/types';

import { TaskList, TaskCreationForm } from '../';

import classes from './main.module.css';

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
    <main className={classes['main']}>
      <header className={classes['main__header']}>
        <h1 className={classes['header__h1']}>Your tasks</h1>
      </header>
      <article>
        <section className={classes['tasks']}>
          <TaskCreationForm setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </section>
      </article>
    </main>
  );
}
