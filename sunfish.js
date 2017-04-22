/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

// import modules
const cheerio = require('cheerio');
const fs = require('fs');
const nodemailer = require('nodemailer');
const request = require('request');

// set global variables
var GU = process.env.GU;
var GK = process.env.GK;
var currentDateTime;

// set get request to endpoint
request('https://sfbay.craigslist.org/search/boa?sort=date&query=sunfish', function (error, response, body) {
  if (error) console.log(error);
  else if (response.statusCode !== 400) {
    parseHtml(body);
  }
});

// parse html for datetime
function parseHtml(body) {
  const $ = cheerio.load(body);
  const datetime = $('.result-date').attr('datetime');
  sanitize(datetime);
}

// sanitize datetime
function sanitize(datetime) {
  currentDateTime = datetime.replace(new RegExp(/-| |:/g),'');
  //saveTime(currentDateTime);
  compareDateTime(currentDateTime);
}

// compare datetime
function compareDateTime(currentDateTime) {
  fs.readFile('./currentDateTime.txt', 'utf8', function (err, data) {
    if (err) throw err;
    if (currentDateTime === data) {
      console.log('Suh, nothing new to see.');
      sendEmail();
    }
    if (currentDateTime > data) {
      console.log('Yo yo yo! There is a new boat to row!');
      updateDateTime();
    }
  });
}

// update datetime
function updateDateTime(currentDateTime) {
  fs.writeFile('./currentDateTime.txt', currentDateTime, 'utf8', compareDateTime);
}

// send email
function sendEmail() {
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
}
