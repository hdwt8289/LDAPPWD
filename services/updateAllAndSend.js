'use strict';
const send = require('../helper/updateAllAndSend');


module.exports = {
    // 批量生成复杂密码并逐一发送邮件
    updateAllAndSend() {
        return send.updateAllAndSend().then(data=>{
            return data;
        }).catch(err=>{
            return err;
        })
    },
    // 管理员登陆
    login(data) {
       return send.login(data).then(data=>{
            return data;
       }).catch(err=>{
           console.log(err);
           return err;
       })
    }
};

