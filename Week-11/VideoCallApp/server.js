const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const { v4: uuidV4 } = require("uuid");
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/room/:roomId", (req, res) => {
    const username = req.query.name || "Guest";
    res.render("index", {
        roomId: req.params.roomId,
        username
    });
});


app.get("/end", (req, res) => {
    res.render("end");
});


io.on("connection", socket => {
    socket.on("join-room", (roomId, userId, username) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId, username);

        socket.on("disconnect", () => {
            socket.to(roomId).emit("user-disconnected", userId);
        });
    });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
