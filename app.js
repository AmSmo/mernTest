const express = require("express");
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI
const users = require("./routes/api/users");
const eventbrite = require("./routes/api/eventbrite");
const bodyParser = require('body-parser');
const passport = require('passport')

const server = require('http').createServer(app);
const options = {
    cors: {
        origin: '*',
    } };
const io = require('socket.io')(server, options); 

io.on('connection', socket => { socket.emit("hello", "world"); });

server.listen(3001);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.get("/", (req, res) => {
    console.log(res)
    res.send("Hleo World")});
app.use("/api/users", users);
app.use("/api/eventbrite", eventbrite);