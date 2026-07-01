const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    from_name: {
      type: String,
      required: [true, "Sender name is required"],
      trim: true,
      minlength: 1,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      
    },
    company: {
      type: String,
      default: "Personal",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: 1,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

module.exports = ContactMessage;
