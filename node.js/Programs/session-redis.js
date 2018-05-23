var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var app = express();
app.listen(3000);

app.use(session({ store: new redisStore(),
                  secret: 'somesecrettoken' }));

app.get('/', function (req, res) {
    if (req.session.isVisit) {
        req.session.isVisit += 1;
        res.send('<p>第 ' + req.session.isVisit + ' 次来到此页面</p>');
    }
    else {
        req.session.isVisit = 1;
        res.send('欢迎第 1 次来这里');
    }
});