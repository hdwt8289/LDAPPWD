
'use strict';
const updateService = require('../services/update');

module.exports = {

    ///显示修改页面
    show: function (req, res, next) {
        res.render('update');
    },

    //修改密码
   async updatePwd(req, res, next) {
        var data = req.body;
        const result =await updateService.updatePwd(data);
        res.send(result);
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
        const result = await updateService.resetPwd(data);
        res.send(result);
    },
    ///验证码发送接口
    async reqSmsCode(req,res,next){
        var data = req.query;
        const result = await updateService.sendCode(data);
        res.send(result);
    },
    //操作成功
    success: function (req, res, next) {
        res.render('success');
    }
}