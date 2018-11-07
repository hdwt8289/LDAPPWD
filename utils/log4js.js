/**
 * 日志模块
 */

var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            type: "file",///file
            filename: 'logs/log.log',
            maxLogSize: 1024 * 1024,
            backups: 3,
            category: 'default'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('default');
logger.setLevel('INFO');

//配置日志
log4js.useApp = function (app) {
    app.use(log4js.connectLogger(logger, {level: 'auto', format: ':status  :method  :url'}));
};

//提供调用接口
module.exports = log4js;
module.exports.logger = logger;