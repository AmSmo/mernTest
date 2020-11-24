module.exports = (function(){
    const port = process.env.PORT || 3000;
    const express = require('express')
    const server = express()
        .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
        .listen(port, () => console.log(`Socket on ${port}`));
    const options = {
        cors: {
            origin: '*',
        }
    };
const io = require('socket.io')(server); 
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
    // server.listen();

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