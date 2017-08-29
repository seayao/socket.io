/**
 * Created by Administrator on 2017/8/10.
 */
var socketio = {};
var socket_io = require('socket.io');

//获取io
socketio.getSocketio = function(server){
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        socket.on('click1',function(msginof){
            socket.emit('click2', {datas: msginof});
            socket.broadcast.emit('click2',  {datas: msginof});
        })
    })
};

module.exports = socketio;