import React, { useState } from 'react';
import taskService from 'src/api/tasks';
import { Task } from 'src/types';

export default function TaskCreationForm({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [taskName, setTaskName] = useState('');

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
    <div className="task-creation">
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
        className="task-creation-btn"
        onClick={(e) => {
          e.preventDefault();
          handleCreate(taskName);
        }}
      >
        <img src="/icons/add.svg" alt="" />
      </button>
    </div>
  );
}
