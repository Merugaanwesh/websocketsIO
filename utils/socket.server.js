const express = require("express");
const app = express();
var http = require("http");
var serverIo = http.createServer(app);
var io = require("socket.io")(serverIo);
const jwt = require("jsonwebtoken");
const messageStorage = require("../utils/messageStorage");
const userSchema = require("../module/userList");
const messageSchema = require("../module/messages");
const moment = require("moment-timezone");
let webSocketServer = async () => {
  try {
    const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
    io.use((socket, next) => {
      if (socket.handshake.headers.authtoken == null) {
        console.log("message: Invalid Token");
      } else {
        jwt.verify(
          socket.handshake.headers.authtoken,
          jwtSecretKey,
          (error, user) => {
            if (error) {
              console.log("session expired..." + "    " + error);
            } else {
              next();
            }
          }
        );
      }
    });
    //socket connection event ...
    io.on("connection", (socket) => {
      //sending message to all except the sender event..
      socket.on("message", async (msg) => {
        let data = JSON.parse(msg);
        socket.broadcast.emit(`message/${data.from}/${data.to}`, data.message);
        let Message = {
          messageId: Date.now(),
          message: data.message,
          from: data.from,
          to: data.to,
          createAt: moment().format(),
          isRead: false,
        };
        let combinationExist = await messageSchema.find({
          $or: [
            { user1: data.from, user2: data.to },
            { user1: data.to, user2: data.from },
          ],
        });
        if (combinationExist.length != 0) {
          await messageSchema.updateOne(
            {
              $or: [
                { user1: data.from, user2: data.to },
                { user1: data.to, user2: data.from },
              ],
            },
            { $push: { messages: Message } }
          );
          return;
        }
        let newcombination = {
          combinationId: Date.now(),
          user1: data.from,
          user2: data.to,
          messages: Message,
        };
        await new messageSchema(newcombination)
          .save()
          .then(() => {
            console.log("data saved successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
    serverIo.listen(4000, () => {
      console.log("socket Server listening on :4000");
    });
  } catch (error) {
    console.log("error in webSocketServer...error" + " " + error.message);
  }
};
module.exports = { webSocketServer: webSocketServer };
