const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat");
const crypto = require("crypto");

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret, app_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    //StreamChatは２つのインスタンスが必要、クライアント側とサーバー側で
    //const serverClient = StreamChat.getInstance（YOUR_APP_KEY、YOUR_APP_SECRET）;
    //トークンの作成、ユーザーのアップサート(update+insert)、及びサーバー側でy美出す必要のある全てのメソッドで使用される
    //https://getstream.zendesk.com/hc/en-us/articles/1500012878921-Chat-Basic-Guide

    const users = await client.queryUsers({ name: username });

    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res
        .status(200)
        .json({ token, fullName: users[0].fullName, userId: users[0].id });
    } else {
      res.status(500).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login };
