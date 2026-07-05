import api from "./axios";

 const loginUser = (data) =>
  api.post("/auth/login", data);

 const registerUser = (data) =>
  api.post("/auth/register", data);

 const logoutUser = () =>
  api.post("/auth/logout");

const getCurrentUser = () =>
  api.get("/auth/me");    

export { loginUser, registerUser, logoutUser, getCurrentUser };