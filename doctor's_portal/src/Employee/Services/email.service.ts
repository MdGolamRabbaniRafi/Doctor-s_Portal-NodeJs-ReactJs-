import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

// import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(to,subject,message) {
    return this.mailerService.sendMail({
      to: to,
      subject: subject,
      text: message
     
    })
  }
}