import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Signup service
export const createUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/signup`, user);
  return response;
};

// Signup service
export const loginUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/login`, user);
  return response;
};
