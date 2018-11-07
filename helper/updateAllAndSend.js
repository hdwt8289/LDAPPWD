'use strict';
const log = require('../utils/log4js').logger;
const ldap = require('ldapjs');
const config = require('../config');
const baseDN = config.baseDN;
const Q = require('q');
const client = ldap.createClient({ url: config.url });
const emailService = require('../lib/email-service');
const shuffle = require('knuth-shuffle').knuthShuffle;
let entryDN = '';


module.exports = {
    // 批量生成复杂密码并逐一发送邮件
    updateAllAndSend: () => {
        let d = Q.defer();
        try {
            client.bind('cn=Manager,dc=redcore,dc=cn', config.pwd, function (err) {
                //console.log('success');
            })
        } catch (error) {

        }
        try {
            const opts = {
                filter: '(objectClass=inetOrgPerson)',
                scope: 'sub',
                attributes: ['mail', 'displayName', 'userPassword', 'dn']
            }
            client.search(baseDN, opts, (err, res) => {
                res.on('searchEntry', (entry) => {
                    let obj = entry.object;
                    const dn = obj.dn;
                    const pwd = obj.userPassword;
                    if (pwd == config.userPwd) {
                        const email = obj.mail;
                        const name = obj.displayName;
                        const user = {
                            name: name,
                            email: email,
                            domainName: 'redcore.cn',
                            adminEmail: email,
                            loginName: email
                        }
                        try {
                            let options = generateSendEmailOptions(user);
                            options.data.password = genNewPwd();
                            console.log(options.data.password);
                            const change = new ldap.Change({
                                operation: 'replace',
                                modification: {
                                    userPassword: options.data.password
                                }
                            });
                            client.modify(dn, change, (err) => {
                                if (err) {
                                    console.log(err);
                                    d.reject({ status: 'err' });
                                } else {
                                    emailService(options).then(function (result1) {
                                        d.resolve({ status: 'success' });
                                    }).catch(function (err) {
                                        emailSendFailedUsers.push(user);
                                        d.reject({ status: 'err' });
                                    });
                                }
                            });
                        } catch (e) {
                            console.log(e);
                            d.reject({ status: 'err' });
                        }
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
                    client.unbind();
                });
            });
        }
        catch (ex) {
            console.log(ex);
            d.reject({ status: 'err' });
        }
        return d.promise;
    },
    // 管理员登陆
    login: (data) => {
        let d = Q.defer();
        const name = data.name;
        const userPwd = data.userPwd;
        if (name == config.manager) {
            try {
                const opts = {
                    filter: '(mail=' + name + ')',
                    scope: 'sub',
                    attributes: ['dn']
                }
                client.search(baseDN, opts, (err, res) => {
                    res.on('searchEntry', (entry) => {
                        let obj = entry.object;
                        entryDN = obj;
                        const dn = obj.dn;
                        try {
                            client.bind(dn, userPwd, function (err) {
                                if (err) {
                                    d.reject({ status: 'wrongPassword' });
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
                        d.reject({ status: 'err' });
                    });
                    res.on('end', (result) => {
                        if (entryDN == '') {
                            d.reject({ status: 'noUser' });
                        }
                        console.log('end');
                        client.unbind();
                    });
                });
            }
            catch (ex) {
                console.loog(ex);
                d.reject({ status: 'err' });
            }
        }
        else {
            d.reject({ status: 'noUser' });
        }
        return d.promise;
    }
};

/**
 * 数据生成
 * @param {*} user 
 */
function generateSendEmailOptions(user) {
    let logoPngUrl, productPngUrl;
    if (config.isPrivateDevelopment) {
        logoPngUrl = getStaticFileUrl(config.defaultFiles.userActiveEmailicon.logo.onPremise);
        productPngUrl = getStaticFileUrl(config.defaultFiles.userActiveEmailicon.product.onPremise);
    } else {
        logoPngUrl = getStaticFileUrl(config.defaultFiles.userActiveEmailicon.logo.saas);
        productPngUrl = getStaticFileUrl(config.defaultFiles.userActiveEmailicon.product.saas);
    }
    return {
        templateName: 'active',
        to: user.email,
        subject: '红芯统一管控平台',
        data: {
            name: user.name,
            domainName: user.domainName,
            adminEmail: user.adminEmail,
            loginName: user.loginName,
            logPngUrl: logoPngUrl,
            productPngUrl: productPngUrl
        }
    };
}
/**
* 根据部署方式返回正确的静态文件url
* @param {*} url
*/
function getStaticFileUrl(url) {
    if (!url) {
        return url;
    } else {
        if (url.indexOf('http') !== -1) {
            return url;
        } else {
            //return config.isPrivateDevelopment ? (config.onPremiseCompany.managerServer + url) : url;
            return url;
        }
    }
};

/**
 * 密码生成
 */
function genNewPwd() {
    let text = "";
    let possible0 = "abcdefghijklmnopqrstuvwxyz";
    let possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let possible2 = "~!@&%$^()#_+?:,{}";
    let possible3 = "0123456789";

    for (var i = 0; i < 2; i++) {
        text += possible0.charAt(Math.floor(Math.random() * possible0.length));
        text += possible1.charAt(Math.floor(Math.random() * possible1.length));
        text += possible2.charAt(Math.floor(Math.random() * possible2.length));
        text += possible3.charAt(Math.floor(Math.random() * possible3.length));
    }
    let arr = text.split('');
    let b = shuffle(arr.slice(0));
    text = b.join('');
    return text;
}