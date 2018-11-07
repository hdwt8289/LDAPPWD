'use strict';

const appid = 1400055544;
const appkey = 'ba10fd284c869fb506c120861ac08f11';
const templId = 66781;
const QcloudSms = require('qcloudsms_js');
const qcloudsms = QcloudSms(appid, appkey);
const sms = module.exports;
const Q = require('q');

sms.send = function (mobile, message) {
  mobile = mobile + '';
  const ssender = qcloudsms.SmsSingleSender();
  const params = [message, 5];
  const d = Q.defer();
  ssender.sendWithParam(86, mobile, templId, params, '', '', '', function (err, res, resData) {
    if (err) {
      d.reject(err);
    } else {
      console.log(resData);
      d.resolve(resData);
    }
  });
  return d.promise;
};
