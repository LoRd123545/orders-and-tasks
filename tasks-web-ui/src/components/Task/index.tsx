import './Task.css';
import { useState } from 'react';
import { Task as TaskType } from 'src/types';

export default function Task(props: {
  task: TaskType;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, name: string) => void;
}) {
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [name, setName] = useState(props.task.name);
  return (
    <div className="task">
      <div className="task__name">
        <input
          type="text"
          defaultValue={props.task.name}
          onChange={(e) => {
            setHasBeenEdited(true);
            setName(e.target.value);
          }}
        />
      </div>
      <div className="task__status">{props.task.status}</div>
      {hasBeenEdited && (
        <button
          className="task__icon"
          onClick={(e) => {
            e.preventDefault();
            setHasBeenEdited(false);
            props.handleUpdate(props.task.id, name);
          }}
        >
          <img src="/icons/check.svg" alt="" />
        </button>
      )}
      <button
        className="task__icon"
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
