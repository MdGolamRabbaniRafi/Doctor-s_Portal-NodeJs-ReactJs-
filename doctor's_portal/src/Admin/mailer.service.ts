import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mirfaris79@gmail.com',
        pass: 'dxyekyeighltfntb',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<{ status: string; message: string }> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'mirfaris79@gmail.com',
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
    return { status: 'success', message: 'Email sent successfully' };
  }
}
