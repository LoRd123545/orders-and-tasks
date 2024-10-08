async function remove(id: string): Promise<null> {
  return new Promise((acc, rej) => {
    fetch(`http://localhost/api/products/v1/products/${id}`, { method: 'DELETE' })
      .then(() => {
        acc(null);
      }).catch((err) => {
        rej(err);
      })
  })
}

export { remove }