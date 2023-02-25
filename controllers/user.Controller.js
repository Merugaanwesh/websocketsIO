const userSchema = require("../module/userList");
const bcrypt = require("bcrypt");
const jwtTokenGeneration = require("../utils/jwtTokenGenerator");
let userRegistration = async (req, res) => {
  try {
    let { firstName, lastName, PhoneNumber, Email, Password } = req.body;
    let emailFinde = await userSchema.find({ Email: Email });
    if (emailFinde.length != 0) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }
    let salt = await bcrypt.genSalt();
    let haspassword = await bcrypt.hash(Password, salt);
    let userData = {
      userId: Date.now(),
      firstName: firstName,
      lastName: lastName,
      PhoneNumber: PhoneNumber,
      Email: Email,
      Password: haspassword,
    };
    new userSchema(userData)
      .save()
      .then(() => {
        res.status(200).json({
          message: "Registration completed successfully, please log in",
        });
      })
      .catch((error) => {
        console.log("admin controllers => adminSignUp", error);
        res.status(400).json({ message: error });
      });
  } catch (error) {
    console.log("user controllers", error);
    res.status(500).json({ message: "internal error", error: error.message });
  }
};

let logIn = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    let findEmail = await userSchema.find({ Email: Email });
    let passwordCheck = await bcrypt.compare(Password, findEmail[0].Password);
    if (passwordCheck == false) {
      return res.status(401).json({ message: "password is wrong" });
    }
    let tokenObj = {
      userId: findEmail[0].userId,
      Email: Email,
      uid: Date.now(),
    };
    let jwtToken = await jwtTokenGeneration.jwtTokenGeneration(tokenObj);
    res.status(200).json({ message: "success", AccessToken: jwtToken });
  } catch (error) {}
};

module.exports = { userRegistration: userRegistration, logIn: logIn };
