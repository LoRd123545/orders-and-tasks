import { UpdateReportDto } from 'src/types';

async function update(id: string, newReport: UpdateReportDto): Promise<null> {
  return new Promise((acc, rej) => {
    fetch(`http://localhost/api/reports/v1/reports/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newReport),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        acc(null);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export { update };
