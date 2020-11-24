module.exports = (function(app){
    let server
    if (app.protocol === "https"){
         server = require('https').createServer(app);
    }else{
         server = require('http').createServer(app);}

    const options = {
        cors: {
            origin: '*',
        }
    };
const io = require('socket.io')(server, options); 
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
    

io.on("connection", (socket) => {
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on("changeTime", (data)=>{
        io.in(roomId).emit("changeTime", data)
    })

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
})


}
)