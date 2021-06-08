const socket = require("../util/socket");

const avatarList = [
  'avatar-1.png',
  'avatar-2.png',
  'avatar-3.png',
  'avatar-4.png',
]

exports.getMessages = (req, res, next) => {
  return res.json({
    message: "welcome dude!",
  });
};

exports.postMessage = (req, res, next) => {
  const currentTime = new Date();
  const { message, sender, uid, avatar } = req.body;
  console.log(req.body);
  socket.getIO().emit("msg", {
    message,
    sender,
    uid,
    avatar,
    time: currentTime,
  });
  return res.json({
    message: "message sent!",
  });
};

exports.getClientPage = (req, res, next) => {
  return res.render('stream-client', {
    avatarList
  });
}