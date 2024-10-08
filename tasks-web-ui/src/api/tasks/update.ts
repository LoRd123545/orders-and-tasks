import { UpdateTaskDto } from "src/types";

async function update(id: string, newTask: UpdateTaskDto): Promise<null> {
  return new Promise((acc, rej) => {
    fetch(`http://localhost/api/tasks/v1/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => { acc(null); })
      .catch((err) => { rej(err) })
  });
}

export {
  update
}