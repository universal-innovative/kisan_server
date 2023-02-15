const express = require("express");

// controllers
const { send, list } = require("../controllers/message");
// middleware

// --------------------------------------------------------------------

const router = express.Router();

// routes

router.post("/message/send", send);
router.get("/messages/list", list);

module.exports = router;
