const server = require('http').createServer((req, res) =>{
    res.writeHead(200);
    res.end('Web: Server is runningyy!');
});
const io = require('socket.io')(server);

server.listen(6001, () => {
    console.log('Console: Server is running!');
});

io.on('connection', (socket) => {
    console.log('Server: io connected');

    let tweet = {user: "nodesource", text: "Hello, world!"};
    let interval = setInterval(() => {
        socket.emit("tweet", tweet);
    }, 1000);

    socket.on("disconnect", () => {
        clearInterval(interval);
        console.log('Server: DISconnected');
    });

    socket.on("tweet", (tweet) => {
        console.log(tweet);
    });

});

const Redis = require('ioredis');
const redis = new Redis({
    port: 6379,
    host: '127.0.0.1',
    family: 4,  // 4(IPv4) or 6(IPv6)
    //password: 'luckyus',
    db: 0,
});

redis.psubscribe('*', (err, count) => {
    console.log('ss', count);
});

redis.on('pmessage', (subscribed, channel, message) => {
    console.log(channel);
    console.log(message);
    let jmessage = JSON.parse(message);
    io.emit(channel + ':' + jmessage.appclass, jmessage.count);
});
