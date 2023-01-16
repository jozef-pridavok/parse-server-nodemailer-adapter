var nodemailer = require('nodemailer');

var NodemailerAdapter = nodemailerOptions => {
  if (!nodemailerOptions || !nodemailerOptions.user || !nodemailerOptions.password || !nodemailerOptions.from) {
    throw 'NodemailerAdapter requires an user name, password, and fromAddress.';
  }

  var sendMail = mail => {

    let message = {
        from: mail.from ?? nodemailerOptions.from,
        to: mail.to, subject: mail.subject,
        text: mail.text,
        html: mail.html
    };
    let smtpConfig = {
        host: nodemailerOptions.host,
        port: nodemailerOptions.port,
        secure: nodemailerOptions.secure,
        auth: {
            user: nodemailerOptions.user,
            pass: nodemailerOptions.password
        }
    };
    let transporter = nodemailer.createTransport(smtpConfig);

    return new Promise((resolve, reject) => {
      transporter.sendMail(message, (error, info) => {
        if (error) {
          reject(error);
        }
        resolve(info);
      });
    });
  }

  return Object.freeze({
    sendMail: sendMail
  });
}

module.exports = NodemailerAdapter;
