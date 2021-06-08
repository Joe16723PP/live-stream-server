const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const { startNMSServer } = require("./util/media-server");
const messageRoutes = require("./routes/message");
const app = express();
// cors origin problem
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// set views folder for root views
app.set("view engine", "ejs");
app.set("views", "views");
// set public folder to static serve
app.use(express.static(path.join(__dirname, "public")));
// routes
app.use(messageRoutes);

// media server
startNMSServer();

// express server
const server = app.listen(8080);
console.log("stream server listen on port 8080");

// socket server
const io = require("./util/socket").init(server);
io.on("connection", (socket) => {
  console.log("Client connected");
});
