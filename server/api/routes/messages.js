const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/messages');

router.post('/send_message', MessageController.send_message);

router.post('/get_messages', MessageController.get_messages);

module.exports = router;
