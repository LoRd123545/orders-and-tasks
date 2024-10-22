import { Report, CreateReportDto } from 'src/types';

async function create(report: CreateReportDto): Promise<Report> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/reports/v1/reports', {
      method: 'POST',
      body: JSON.stringify(report),
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

export { create };
