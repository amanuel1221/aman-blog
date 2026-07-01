const validateContactInput = ({ from_name, email, message }) => {
  if (!from_name || typeof from_name !== "string" || !from_name.trim()) {
    throw new Error("Sender name is required and cannot be empty");
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    throw new Error("Email is required and cannot be empty");
  }

  const emailValue = email.trim().toLowerCase();
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(emailValue)) {
    throw new Error("Please provide a valid email address");
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    throw new Error("Message is required and cannot be empty");
  }
};

module.exports = { validateContactInput };