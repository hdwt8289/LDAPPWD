var sendMail = require('./index.js');

sendMail({
  templateName: 'redcore-to-register',
  to: 'jun.zhang@yunshipei.com,zheng.zhang@yunshipei.com',
  subject: '红芯企业浏览器注册信息',
  data: {
    hubUrl: 'http://192.168.2.252:9432',
    name: '测试邮件',
    website: 'http://saaatest.redcore.cn',
    adminTel: 18221624125,
    adminEmail: '18221624125@qq.com',
    adminName: '测试',
    adminPass: '12345678',
    userPass: '12345678'
  }
}).then(function (res) {
  console.log(1, res);
}).catch(function (err) {
  console.log(err);
});
