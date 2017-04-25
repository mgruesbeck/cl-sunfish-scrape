/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

// import modules
const checkCraigslist = require('./checkCraigslist.js');
const schedule = require('node-schedule');
const sendEmail = require('./sendEmail.js');

console.log('looking for sail boats...');

// call httpRequest.js and mailer.js with scheduler 
var scheduler = schedule.scheduleJob('* * * * *', function(){
  console.log('checking craigslist...');
  checkCraigslist();
  // parse craigslist
  // santize
  // compare datetime
  // update datime
  // send email
});
