const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

app.get("/", () => {
  res.send("Working properly")
})

app.post("/webhook/:status/:scanId", (req, res) => {
    const scanId = req.params.scanId
    const status = req.params.status
    const result = req.body

    const payload = {...result, scanId, status}
    io.emit("copyleaks", payload);
    res.send({response: "Received successfully"}).status(200);
});

server.listen(port, () => console.log(`Listening on port ${port}`));