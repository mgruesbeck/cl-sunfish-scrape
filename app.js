/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

// import modules
const checkCl = require('./checkCl.js');
const schedule = require('node-schedule');

console.log('looking for sail boats...');

// call httpRequest.js and mailer.js with scheduler 
var scheduler = schedule.scheduleJob('* * * * *', function(){
  console.log('checking craigslist...');
  checkCl();
});
