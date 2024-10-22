import reportService from 'src/api/reports';
import taskService from 'src/api/tasks';
import './ReportCreationForm.css';
import { FormEvent } from 'react';
import { TaskFindOptions } from 'src/types';
import {
  Page,
  Text,
  Document,
  View,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { useState, ReactNode } from 'react';

export default function ReportCreationForm() {
  const [reportDownloadLink, setReportDownloadLink] =
    useState<ReactNode | null>(null);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // report name
    const name = e.currentTarget['report-name'].value;

    // dates
    const startDate = e.currentTarget['start-date'].value;
    const endDate = e.currentTarget['end-date'].value;

    // statuses
    const inProgress = e.currentTarget['in-progress'].checked;
    const notStarted = e.currentTarget['not-started'].checked;
    const done = e.currentTarget['done'].checked;

    const statuses = [];

    if (inProgress) statuses.push('in-progress');
    if (notStarted) statuses.push('not-started');
    if (done) statuses.push('done');

    const filterOptions: TaskFindOptions = {
      where: {
        dueTo: {
          start: startDate,
          end: endDate,
        },
        /* @ts-expect-error to simplify code */
        status: statuses,
      },
    };

    taskService
      .filter(filterOptions)
      .then((tasks) => {
        reportService
          .create({
            data: tasks,
            name: name,
          })
          .then((report) => {
            console.log(report);
            const pdf = (
              <Document>
                <Page size="A4">
                  <View>
                    <Text>{JSON.stringify(report)}</Text>
                  </View>
                </Page>
              </Document>
            );

            const link = (
              <PDFDownloadLink document={pdf} fileName={report.name}>
                download report
              </PDFDownloadLink>
            );

            setReportDownloadLink(link);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <form
        action=""
        className="report-creation"
        onSubmit={handleSubmit}
        method="post"
      >
        <h2>Report</h2>
        <input type="text" placeholder="name" name="report-name" />
        <div className="statuses">
          <h3>Choose statuses</h3>
          <div className="status">
            <label htmlFor="not-started">not started</label>
            <input
              type="checkbox"
              id="not-started"
              defaultChecked
              name="not-started"
            />
          </div>
          <div className="status">
            <label htmlFor="done">done</label>
            <input type="checkbox" id="done" defaultChecked name="done" />
          </div>
          <div className="status">
            <label htmlFor="in-progress">in-progress</label>
            <input
              type="checkbox"
              id="in-progress"
              defaultChecked
              name="in-progress"
            />
          </div>
        </div>
        <div className="dates">
          <h3>Dates</h3>
          <div className="date">
            <label htmlFor="start-date">start</label>
            <input type="datetime-local" name="start-date" id="start-date" />
          </div>
          <div className="date">
            <label htmlFor="end-date">end</label>
            <input type="datetime-local" name="end-date" id="end-date" />
          </div>
        </div>
        <button className="btn">create report</button>
      </form>
      <button className="btn">{reportDownloadLink || 'download report'}</button>
    </>
  );
}
