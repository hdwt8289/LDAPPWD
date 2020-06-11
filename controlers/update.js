
'use strict';
const updateService = require('../services/update');
const Joi = require('joi');
module.exports = {

    ///显示修改页面
    show: function (req, res, next) {
        res.render('update');
    },

    //修改密码
    async updatePwd(req, res, next) {
        var data = req.body;
        const schema = Joi.object().keys({
            name: Joi.string().min(2).max(20).required(),
            oldPwd: Joi.string().min(8).max(18).required(),
            newPwd: Joi.string().min(8).max(18).required()
        });
        const rst = Joi.validate(data, schema);
        if (rst.error == null) {
            const result = await updateService.updatePwd(data);
            res.send(result);
        } else {
            res.send({ status: 'perr' });
        }
    },

    //取消操作
    updateCancel: function (req, res, next) {
        res.render('update');
    },
    ///重置密码页面
    retrieve: function (req, res, next) {
        res.render('retrieve');
    },
    //重置密码
    async resetPwd(req, res, next) {
        var data = req.body;
        const schema = Joi.object().keys({
            name: Joi.string().min(2).max(20).required(),
            mobile: Joi.string().regex(/^1[3|5|6|7|8][0-9]\d{8}$/).required(),
            telNum: Joi.string().min(4).max(4).required(),
            newPwd: Joi.string().min(8).max(18).required()
        });
        console.log(data);
        const rst = Joi.validate(data, schema);
        if (rst.error == null) {
            const result = await updateService.resetPwd(data);
            res.send(result);
        } else {
            res.send({ status: 'perr' });
        }
    },
    ///验证码发送接口
    async reqSmsCode(req, res, next) {
        var data = req.query;
        const schema = Joi.object().keys({
            name: Joi.string().min(2).max(20).required(),
            mobile: Joi.string().regex(/^1[3|5|6|7|8][0-9]\d{8}$/).required()
        });
        const rst = Joi.validate(data, schema);
        if (rst.error == null) {
            const result = await updateService.sendCode(data);
            res.send(result);
        } else {
            res.send({ status: 'err' });
        }
    },
    //操作成功
    success: function (req, res, next) {
        res.render('success');
    }
}