import { Task } from 'src/types';

async function find(): Promise<Task[]> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/tasks/v1/tasks')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      })
  })
}

export {
  find
}