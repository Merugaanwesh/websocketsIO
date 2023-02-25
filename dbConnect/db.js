const mongoose = require("mongoose");
const serverConfig = require("../conifig/config");
let dbConnect = async () => {
  let mongoUrl = "";
  if (
    serverConfig.db.user !== undefined &&
    serverConfig.db.pass !== undefined
  ) {
    mongoUrl = `mongodb://${serverConfig.db.user}:${serverConfig.db.pass}@${serverConfig.db.server}:${serverConfig.db.port}/${serverConfig.db.name}`;
  } else {
    mongoUrl = `mongodb://${serverConfig.db.server}:${serverConfig.db.port}/${serverConfig.db.name}`;
  }
  mongoose.set("strictQuery", false);
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((error) => {
      console.error(`Error in database connection ${error.message}`);
    });
};

module.exports = { dbConnect: dbConnect };
