const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [
    {
      timestamp: {
        type: Number,
      },
      ip: {
        type: String,
      },
      browser: {
        type: String,
      },
      operatingSystem: {
        type: String,
      },
      deviceType: {
        type: String,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Assuming you have a User model
    required: true,
  }
}, { timestamps: true });

const URL = mongoose.model("urls", urlSchema);
module.exports = URL;
