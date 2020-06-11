
'use strict';
const updateService = require('../services/updateAllAndSend');
const Joi = require('joi');
module.exports = {

    //批量生成复杂密码并逐一发送邮件
    async updateAllAndSend(req, res, next) {
        const result = await updateService.updateAllAndSend();
        res.send(result);
    },
    ///管理员登陆
    async login(req, res, next) {
        var data = req.body;
        const schema = Joi.object().keys({
            name: Joi.string().min(2).max(20).required(),
            userPwd: Joi.string().min(8).max(18).required()
        });
        const rst = Joi.validate(data, schema);
        if (rst.error == null) {
            const result = await updateService.login(data);
            if (result.status == 'success') {
                req.session.user = data.name;
            }
            res.send(result);
        } else {
            res.send({ status: 'perr' });
        }
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