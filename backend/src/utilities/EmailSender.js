const nodemailer = require('nodemailer');
const createError = require('http-errors');
const config = require('config');

const { smtp, port, ssl, username, password, emailFrom } = config.get('emailSending');

class EmailSender {
  constructor(emailTo, subject, htmlText) {
    this.emailTo = emailTo;
    this.subject = subject;
    this.htmlText = htmlText;
  }

  async send() {
    let transporter = nodemailer.createTransport({
      host: smtp,
      port: port,
      secure: ssl,
      auth: {
        user: username,
        pass: password,
      },
    });

    await transporter.sendMail({
      from: emailFrom,
      to: this.emailTo,
      subject: this.subject,
      html: this.htmlText,
    });
  }
}

exports.sendEmail = (req, res, next) => {
  const { passwordForSourceEmail, emailTo } = req.body;
  let { subject, htmlText } = req.body;

  if (passwordForSourceEmail !== password) {
    return next(new createError.Unauthorized('Missing or bad authentication!'));
  }

  if (!emailTo) {
    return next(new createError.BadRequest('Missing email address!'));
  }

  subject = subject || '';
  htmlText = htmlText || '';

  try {
    const emailSender = new EmailSender(emailTo, subject, htmlText);
    emailSender.send();
    return res.sendStatus(200);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};
