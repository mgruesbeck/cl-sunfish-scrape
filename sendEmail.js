/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

// import modules
const nodemailer = require('nodemailer');

// set global variables
const GU = process.env.GU;
const GK = process.env.GK;

// create sendEmail function
const sendEmail = function () {
  // create reusable transporter object with SMTP
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: GU,
          pass: GK
      }
  });

  // create email
  let mailOptions = {
      from: 'Melvin Gruesbeck<mgruesbeck@gmail.com>', // sender
      to: 'mgruesbeck@gmail.com', // receivers
      subject: 'Yo yo yo! There is a new boat to row!', // subject
      text: 'See the latest: https://sfbay.craigslist.org/search/boa?sort=date&query=sunfish.', // text body
      html: '<p>See the latest: </p><a href="https://sfbay.craigslist.org/search/boa?sort=date&query=sunfish">https://sfbay.craigslist.org/search/boa?sort=date&query=sunfish</a>.' // html body
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

// export sendEmail function
module.exports = sendEmail;
