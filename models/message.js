const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
      default: null,
    },
    phone: {
      type: String,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
