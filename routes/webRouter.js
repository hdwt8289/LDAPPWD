
var express = require('express');
var router = express.Router();
var updateController = require('../controlers/index');


/*密码修改与退出*/
router.get('/update', updateController.update.show);
router.post('/update', updateController.update.updatePwd);
router.get('/retrieve', updateController.update.retrieve);
router.post('/retrieve', updateController.update.resetPwd);
router.get('/cancel', updateController.update.updateCancel);
router.get('/sms', updateController.update.reqSmsCode);
router.get('/success', updateController.update.success);
router.get('/login', updateController.updateAllAndSend.loginShow);
router.post('/login', updateController.updateAllAndSend.login);
router.get('/send', updateController.updateAllAndSend.sendShow);
router.post('/send', updateController.updateAllAndSend.updateAllAndSend);


module.exports = router;