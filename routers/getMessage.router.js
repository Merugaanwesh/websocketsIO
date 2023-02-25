const Router = express.Router();
const getMessageCon = require("../controllers/getMessage.controller")
//const verifyjwt = require("../middleware/jwtverification")
Router.get("api/getMessage",getMessageCon.getMessage)
