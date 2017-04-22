/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

// import modules
const checkCl = require('./checkCl.js');
const schedule = require('node-schedule');

// call httpRequest.js and mailer.js with scheduler 
var scheduler = schedule.scheduleJob('0 */4 * * *', function(){
  checkCl();
});
