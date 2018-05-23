const io = require('socket.io-client');
var ss = require('socket.io-stream');
const socket = io.connect('http://localhost:6001');

socket.on('connect', () => {  
    console.log('Client is connected!');
});

socket.on('tweet', (tweet) => {  
    console.log('tweet from', tweet.user);
    console.log('contents:', tweet.text);
});

let tweet = {user: 'clientUser', text: 'GGG'};
socket.emit('tweet', tweet);  

