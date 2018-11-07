
'use strict';
const updateService = require('../services/updateAllAndSend');

module.exports = {

    //批量生成复杂密码并逐一发送邮件
    async updateAllAndSend(req, res, next) {
        const result = await updateService.updateAllAndSend();
        res.send(result);
    },
    ///管理员登陆
    async login(req, res, next){
        var data = req.body;
        const result = await updateService.login(data);
        if(result.status=='success'){
            req.session.user=data.name;
        }
        res.send(result);
    },
    ///显示管理员登陆界面
    loginShow: function (req, res, next) {
        res.render('login');
    },
    ///显示管理员登陆界面
    sendShow: function (req, res, next) {
        res.render('updateAllAndSend');
    },
}