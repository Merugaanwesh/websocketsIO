const messageSchema = require("../module/messages");

let getMessage = async (req, res) => {
  try {
    let { user1, user2 } = req.params;
    let getMessage = await messageSchema.find({
      $or: [
        { user1: user1, user2: user2 },
        { user2: user2, user1: user1 },
      ],
    });
    let finalResult =getMessage[0].messages

    res.status(200).json({ message: "Data fetched successfully", finalResult });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getMessage: getMessage };
