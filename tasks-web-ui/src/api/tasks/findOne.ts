import { Task } from "src/types";

async function findOne(id: string): Promise<Task> {
  return new Promise((acc, rej) => {
    fetch(`localhost/api/tasks/v1/tasks/${id}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      })
  })
}

export { findOne }