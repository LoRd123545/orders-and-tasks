import { Report } from 'src/types';

async function findOne(id: string): Promise<Report> {
  return new Promise((acc, rej) => {
    fetch(`localhost/api/reports/v1/reports/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export { findOne };
