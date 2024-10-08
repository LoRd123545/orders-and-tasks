import './Task.css';
import { useState } from 'react';

export default function Task(props: {
  name: string;
  id: string;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, name: string) => void;
}) {
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [name, setName] = useState(props.name);
  return (
    <div className="task">
      <div className="task__name">
        <input
          type="text"
          defaultValue={props.name}
          onChange={(e) => {
            setHasBeenEdited(true);
            setName(e.target.value);
          }}
        />
      </div>
      {hasBeenEdited && (
        <button
          className="task__icon"
          onClick={(e) => {
            e.preventDefault();
            setHasBeenEdited(false);
            props.handleUpdate(props.id, name);
          }}
        >
          <img src="/icons/check.svg" alt="" />
        </button>
      )}
      <button
        className="task__icon"
        onClick={(e) => {
          e.preventDefault();
          props.handleDelete(props.id);
        }}
      >
        <img src="/icons/delete.svg" alt="" />
      </button>
    </div>
  );
}
