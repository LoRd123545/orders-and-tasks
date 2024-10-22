import { Report } from 'src/types';

async function find(): Promise<Report[]> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/reports/v1/reports')
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

export { find };
