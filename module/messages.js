const mongoose = require("mongoose");
let messages = new mongoose.Schema({
  combinationId: { type: Number },
  user1:{type:String},
  user2:{type:String},
  messages: [Object],
});

module.exports = mongoose.model("messages", messages);
