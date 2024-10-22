import { Request, Response, NextFunction } from 'express';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

import { httpCodes } from '@app/shared/index.js';

const { MAILERSEND_API_KEY, MAILERSEND_DOMAIN } = process.env;

const mailerSend = new MailerSend({
  apiKey: MAILERSEND_API_KEY || '',
});

const sentFrom = new Sender(`you@${MAILERSEND_DOMAIN}` || '');

const find = async (req: Request, res: Response, next: NextFunction) => {};

const findOne = async (req: Request, res: Response, next: NextFunction) => {};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { email, subject, html, text } = req.body;
  const recipients = [new Recipient(email)];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(html)
    .setText(text);

  try {
    const mailerResponse = await mailerSend.email.send(emailParams);
    console.log(mailerResponse);
    res.status(mailerResponse.statusCode).json(mailerResponse);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {};

const remove = async (req: Request, res: Response, next: NextFunction) => {};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
