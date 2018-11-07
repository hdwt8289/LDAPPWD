
'use strict';
const log = require('../utils/log4js').logger;
const ldap = require('ldapjs');
const config = require('../config');
const baseDN = config.baseDN;
const Q = require('q');
const client = ldap.createClient({ url: config.url });
const smsService = require('../lib/sms.service.js');
let Redis = require('ioredis');
const redis = new Redis();
let entryDN = '';

module.exports = {

    //修改密码
    update: (data) => {
        let d = Q.defer();
        const name = data.name;
        const oldPwd = data.oldPwd;
        var newPwd = data.newPwd;

        ////根据用户输入的邮箱和密码，验证用户登陆
        //先查询用户邮箱对应的DN，然后拿着DN去绑定
        try {
            const opts = {
                filter: '(mail=' + name + ')',
                scope: 'sub',
                attributes: ['dn']
            }
            client.search(baseDN, opts, (err, res) => {
                res.on('searchEntry', (entry) => {
                    let obj = entry.object;
                    entryDN=obj;
                    const dn = obj.dn;
                    try {
                        client.bind(dn, oldPwd, function (err) {
                            if (err) {
                                d.reject({ status: 'wrongPassword' });
                            } else {
                                console.log('Success');
                                const change = new ldap.Change({
                                    operation: 'replace',
                                    modification: {
                                        userPassword: newPwd
                                    }
                                });
                                client.modify(dn, change, (err) => {
                                    console.log('modify');
                                    if (err) {
                                        d.reject({ status: 'err' });
                                    } else {
                                        d.resolve({ status: 'success' });
                                    }
                                });
                            }
                        });


                    } catch (e) {
                        console.log(e);
                        d.reject({ status: 'err' });
                    }

                });
                res.on('searchReference', (referral) => {
                    console.log(referral)
                });
                res.on('error', (err) => {
                    console.log(err)
                });
                res.on('end', (result) => {
                    console.log('end');
                    if(entryDN==''){
                        d.reject({ status: 'noUser' });
                    }
                });
            });
        }
        catch (ex) {
            console.log(ex);
            d.reject({ status: 'err' });
        }
        return d.promise;
    },


    //重置密码
    resetPwd: (data) => {
        let d = Q.defer();
        const name = data.name;
        const mobile = data.mobile;
        const telnum = data.telNum;
        var newPwd = data.newPwd;

        redis.get(mobile).then(data => {
            if (telnum == data) {
                const opts = {
                    filter: '(mail=' + name + ')',
                    scope: 'sub',
                    attributes: ['dn']
                }
                client.search(baseDN, opts, (err, res) => {
                    res.on('searchEntry', (entry) => {
                        let obj = entry.object;
                        const dn = obj.dn;
                        try {
                            const change = new ldap.Change({
                                operation: 'replace',
                                modification: {
                                    userPassword: newPwd
                                }
                            });
                            client.modify(dn, change, (err) => {
                                console.log('modify');
                                if (err) {
                                    console.log(err);
                                    d.reject({ status: 'err' });
                                } else {
                                    d.resolve({ status: 'success' });
                                }
                            });
                        } catch (e) {
                            console.log(e);
                            d.reject({ status: 'err' });
                        }

                    });
                    res.on('searchReference', (referral) => {
                        console.log(referral)
                    });
                    res.on('error', (err) => {
                        console.log(err)
                    });
                    res.on('end', (result) => {
                        console.log('end');
                    });
                });
            } else {
                d.reject({ status: 'err' });
            }
        })

    return d.promise;
},

    ///短信验证码发送接口
    sendCode: (data) => {
        let d = Q.defer();
        const name = data.name;
        const mobile = data.mobile;
        redis.get(mobile).then(data=>{
            const value = data;
            const opts = {
                filter: '(mail=' + name + ')',
                scope: 'sub',
                attributes: ['dn', 'mobile']
            }
            client.search(baseDN, opts, (err, res) => {
                res.on('searchEntry', (entry) => {
                    let obj = entry.object;
                    const tel = obj.mobile;
                    if (tel == mobile) {///验证用户输入的手机号是否是记录的手机号
                        const content = (Math.floor(Math.random() * 8999) + 1000).toString();
                        if (value != null) {
                            redis.set(mobile, content);
                            redis.expire(mobile, 5 * 60 * 1000);
                            d.resolve(smsService.send(mobile, content));
                        } else {
                            d.reject("5分钟内不能重复发送！");
                        }
                    } else {
                        d.reject("非本人手机号！");
                    }
                });
                res.on('searchReference', (referral) => {
                    console.log(referral);
                });
                res.on('error', (err) => {
                    console.log(err);
                });
                res.on('end', (result) => {
                    console.log('end');
                });
            });
        })

        
        return d.promise;
    }

}