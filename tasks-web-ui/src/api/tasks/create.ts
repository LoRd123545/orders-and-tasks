import { CreateTaskDto, Task } from "src/types";

async function create(task: CreateTaskDto): Promise<Task> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/tasks/v1/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => { acc(data) })
      .catch((err) => { rej(err) })
  });
}

export { create }