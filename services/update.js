
'use strict';
const log = require('../utils/log4js').logger;
const A = require('../helper/updatePwd');

module.exports = {

    //修改密码
    updatePwd(dataBody) {
        return A.update(dataBody).then(data => {
            return data;
        }).catch(err => {
            return err;
        })
    },


    //重置密码
    resetPwd(dataBody) {
        return A.resetPwd(dataBody).then(data => {
            return data;
        }).catch(err => {
            return err;
        })
    },

    ///短信验证码发送接口
    async sendCode(dataBody) {
        return A.sendCode(dataBody).then(data => {
            return data;
        }).catch(err => {
            return err;
        })
    }

}