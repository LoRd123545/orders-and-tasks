import { useState } from 'react';

import { Task as TaskType } from 'src/types';

import classes from './Task.module.css';

export default function Task(props: {
  task: TaskType;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, name: string) => void;
}) {
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [name, setName] = useState(props.task.name);
  return (
    <div className={classes['task']}>
      <div className={classes['task__props']}>
        <div className={classes['task__name']}>
          <input
            type="text"
            defaultValue={props.task.name}
            onChange={(e) => {
              setHasBeenEdited(true);
              setName(e.target.value);
            }}
          />
        </div>
        <div className={classes['task__status']}>{props.task.status}</div>
        <div className={classes['task__due-date']}>
          {new Date(props.task.dueTo).toString()}
        </div>
        {hasBeenEdited && (
          <button
            className={classes['task__icon']}
            onClick={(e) => {
              e.preventDefault();
              setHasBeenEdited(false);
              props.handleUpdate(props.task.id, name);
            }}
          >
            <img src="/icons/check.svg" alt="" />
          </button>
        )}
      </div>
      <button
        className={classes['task__icon']}
        onClick={(e) => {
          e.preventDefault();
          props.handleDelete(props.task.id);
        }}
      >
        <img src="/icons/delete.svg" alt="" />
      </button>
    </div>
  );
}
