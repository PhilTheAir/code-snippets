var express = require('express');

var e = express();

// 为 '/' 路径指定一个 handler 函数
e.get('/', function (request, response)
{
    // request 包含浏览器的各种信息，如 query / body/ headers
    // response 定制向浏览器的输出信息，如 header 信息或需要向浏览器输出的内容
    response.send('Hello World, from the express.');
});

// 监听本地 3000 端口。第二个函数是回调函数，会在 listen 动作成功后执行。
e.listen(3000, function () { console.log('express is listening at port 3000'); });