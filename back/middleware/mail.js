import nodemailer from 'nodemailer';
import { ErrorHandler } from './errors';

const mailService = nodemailer.createTransport({
	host: "mail.guillaumerx.fr",
	port: 465,
	secure: true,
	auth: {
	  user: process.env.MAIL_USR,
	  pass: process.env.MAIL_PWD
	},
	tls: { rejectUnauthorized: false }
  });

export const mailServiceAvailability = mailService.verify(function(error, success) {
	if (error) {
	  throw new ErrorHandler(500, 'Mail service failed');
	} else {
	  return true;
	}
  });

  export default mailService;