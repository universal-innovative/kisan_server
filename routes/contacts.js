const express = require("express");
const upload = require("../controllers/upload");

// controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/contact");
// middleware

// --------------------------------------------------------------------

const router = express.Router();

// routes

router.post("/contact/create", upload.single("image"), create);
router.get("/contacts/list", list);
router.get("/contact/:id", read);
router.put("/contact/:id", update);
router.delete("/contact/:id", remove);
module.exports = router;
