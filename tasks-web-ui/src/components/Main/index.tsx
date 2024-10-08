import './Main.css';
import TaskList from '../TaskList';
import { useEffect, useState } from 'react';
import taskService from 'src/api/tasks';
import { Task } from 'src/types';

export default function Main() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('task');

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

  function handleCreate(name: string) {
    taskService
      .create({ name })
      .then((task) => {
        setTasks((prev) => {
          const newTasks = [...prev];
          newTasks.push(task);
          return newTasks;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="main">
      <div className="main__add">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            e.preventDefault();
            setTaskName(e.target.value);
          }}
        />
        <button
          className="main__add-btn"
          onClick={(e) => {
            e.preventDefault();
            handleCreate(taskName);
          }}
        >
          <img src="/icons/add.svg" alt="" />
        </button>
      </div>
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </main>
  );
}
