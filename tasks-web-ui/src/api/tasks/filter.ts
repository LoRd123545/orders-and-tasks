import { Task, TaskFindOptions } from 'src/types';

async function filter(options: TaskFindOptions): Promise<Task[]> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/tasks/v1/tasks/filters', {
      method: 'POST',
      body: JSON.stringify(options),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export { filter };
