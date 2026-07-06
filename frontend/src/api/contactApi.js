import api from "./axios";

const submitContactMessage = (messageData) => {
  return api.post("api/contact", messageData);
};

export {submitContactMessage};