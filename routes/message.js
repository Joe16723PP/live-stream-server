const express = require("express");
const router = express.Router();

const messageController = require('../controller/message')

router.post("/message", messageController.postMessage);

router.get("/message", messageController.getMessages);

router.get("/live", messageController.getClientPage)

module.exports = router;
