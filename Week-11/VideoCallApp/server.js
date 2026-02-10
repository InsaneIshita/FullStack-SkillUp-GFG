const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/room/:roomId", (req, res) => {
    res.render("index", { roomId: req.params.roomId });
});

app.get("/end", (req, res) => {
    res.render("end");
});


io.on("connection", socket => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);

        socket.on("disconnect", () => {
            socket.to(roomId).emit("user-disconnected", userId);
        });
    });
});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});
