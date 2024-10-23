import React from 'react';

import taskService from 'src/api/tasks';

import { Task } from 'src/types';

import classes from './TaskCreationForm.module.css';

export default function TaskCreationForm({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  function handleCreate(task: Partial<Task>) {
    const { name = '', status, dueTo } = task;

    console.log(task);

    taskService
      .create({ name, status, dueTo })
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
    <form
      className={classes['task-creation']}
      onSubmit={(e) => {
        e.preventDefault();

        handleCreate({
          name: e.currentTarget.taskName.value,
          status: e.currentTarget.taskStatus.value,
          dueTo: new Date(e.currentTarget.taskDueDate.value).toJSON(),
        });
      }}
    >
      <input type="text" name="taskName" id="" placeholder="name" />
      <select name="taskStatus" id="">
        <option value="not-started">not started</option>
        <option value="in-progress">in progress</option>
        <option value="done">done</option>
      </select>
      <input type="datetime-local" name="taskDueDate" id="" />

      <button className={classes['task-creation-btn']}>Add task</button>
    </form>
  );
}
