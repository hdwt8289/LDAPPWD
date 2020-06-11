/**
 * AD
 */

//加载各中间件
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var mongoStore = require('connect-mongo')(session);
var myLog4js = require('./utils/log4js');
var webrouter = require('./routes/webRouter');



//生成一个express实例
var app = express();

// 设置存放视图文件目录 以及设置视图模板引擎为ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置存放静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置网站图标
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

//解析request等
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// 设置日志
myLog4js.useApp(app);

//session控制
app.use(
    session({
        rolling: true,//延时过期
        resave:false,
        saveUninitialized: true,
        secret: 'redcore',
        key: 'redcoreadupdate',
        cookie: {maxAge : 1000*60*60*24*30},//30天
        //store: new mongoStore({url: 'mongodb://'+ config.dbHost +':'+ config.dbPort +'/'+ config.dbName})
    })
);
app.use(function(req,res,next){
    let url = req.originalUrl;
    // if(url==='/send'&&!req.session.user){
    //     return res.redirect('login');
    // }
    next();
})

/****请求路由跳转****/
app.use('/', webrouter);


/****错误处理****/
//404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
