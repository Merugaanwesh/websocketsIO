const userSchema = require("../module/userList");

let receivedMessage = async (messageObj, id) => {
  try {
    await userSchema.findByIdAndUpdate(
      { userId: id },
      { $push: { receivedMessage: messageObj } }
    );
  } catch (error) {
    console.log(error);
  }
};

let sendedMessages = async (messageObj, id) => {
  try {
    await userSchema.findByIdAndUpdate(
      { userId: id },
      { $push: { sendedMessages: messageObj } }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  receivedMessage: receivedMessage,
  sendedMessages: sendedMessages,
};
