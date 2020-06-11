'use strict';
var nodemailer = require('nodemailer');
var Q = require('q');
var templateRender = require('./lib/template');

var transporter = nodemailer.createTransport({
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'notice@redcore.cn',
    pass: 'Register@2018'
  }
});

var renderTemplate = function (options) {
  var templateName = options.templateName;
  var data = options.data;
  var mailOptions = {from: '"[红芯]" <notice@redcore.cn>'};
  if (options.to) mailOptions.to = options.to;
  if (options.subject) mailOptions.subject = options.subject;
  return templateRender(templateName, data).then(function (htmlString) {
    mailOptions.html = htmlString;
    return mailOptions;
  }).catch(function (err) {
    throw err;
  });
};

var sendMail = function (options) {
  var defer = Q.defer();
  renderTemplate(options).then(function (mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        defer.reject(error);
        return console.log(error);
      }
      defer.resolve(info);
    });
  });

  return defer.promise;
};

module.exports = sendMail;
