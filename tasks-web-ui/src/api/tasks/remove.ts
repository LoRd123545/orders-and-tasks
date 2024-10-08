async function remove(id: string): Promise<null> {
  return new Promise((acc, rej) => {
    fetch(`http://localhost/api/tasks/v1/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        acc(null);
      }).catch((err) => {
        rej(err);
      })
  })
}

export { remove }