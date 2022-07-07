const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'))
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (data) =>{
        // console.log(data.userName + ' : ' + data.msg);
        // console.log(data)
        io.emit('chat message',data)
    });
});

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello World</h1>')
//     res.sendFile(__dirname + '/public/index.html');
    
// })


server.listen(3000, () => {
    console.log('listening on port 3000')
})