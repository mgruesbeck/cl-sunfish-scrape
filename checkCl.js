/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

// import modules
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const sendEmail = require('./sendEmail.js');

// set global variables
var currentDateTime;

// create checkCl function
const checkCl = function () {
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
    compareDateTime(currentDateTime);
  }

  // compare datetime
  function compareDateTime(currentDateTime) {
    fs.readFile('./currentDateTime.txt', 'utf8', function (err, data) {
      if (err) throw err;
      if (currentDateTime === data) {
        console.log('Suh, nothing new to see.');
      }
      if (currentDateTime > data) {
        console.log('Yo yo yo! There is a new boat to row!');
        updateDateTime();
        //sendEmail();
      }
    });
  }

  // update datetime
  function updateDateTime(currentDateTime) {
    fs.writeFile('./currentDateTime.txt', currentDateTime, 'utf8', compareDateTime);
  }
};

module.exports = checkCl;
