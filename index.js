require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIO = require("./utils/socket.server");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/user.Router");
require("./module/userList");
require("./module/messages");
const dbConnect = require("./dbConnect/db");
dbConnect.dbConnect();
socketIO.webSocketServer();
const path = require("path");
app.use(cors({ origin: "*", credentials: true }));

//app to parse the body of the request
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Parse the raw data
app.use(express.raw());

// To set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Set header when response sending in server
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
//rate limit global
app.use("/api/", apiLimiter);

//calling the public files
app.use(express.static("public"));
//Router calling..
app.use(userRouter);

//listening the port
app.listen(process.env.PORT_NUMBER, (err) => {
  if (err) {
    console.log("Error in index file ", err.message);
  } else {
    console.log(`Port Number ${process.env.PORT_NUMBER} server is ruing..`);
  }
});
