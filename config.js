/**
 * Created by qiuwei on 2016/05/10.
 * 配置信息
 */

module.exports = {
    //服务地址以及端口
    host: "127.0.0.1",
    port: "8088",

    ////OPENLDAP服务信息
    url: "ldap://ip:389",
    baseDN: "ou=new,dc=test,dc=cn",
    user: "123@163.cn",
    pwd: "123",
    isPrivateDevelopment: true,
    defaultFiles: {
        // 新建应用默认图标
        appicon: {
            saas: 'https://rdc.blob.cn/application_default_icon.png',
            onPremise: '/files/appiconlogos/default_icon.png'
        },
        // 默认应用默认图标
        redcoreAppicon: {
            saas: 'https://rdc.blob.cn/appiconlogos/redcore_application_default_icon.png',
            onPremise: '/files/appiconlogos/redcore_icon.png'
        },
        // 激活用户的邮件图片
        userActiveEmailicon: {
            logo: {
                saas: 'https://rdc.blob.core.cn/appiconlogos/log.png',
                onPremise: '/files/imgs/logo.png'
            },
            product: {
                saas: 'https://rdc.blob.core.cn/appiconlogos/product.png',
                onPremise: '/files/imgs/product.png'
            }
        }
    },
    manager:"hongbo.zhang@redcore.cn",
    userPwd:'Rc@20181234'
};
