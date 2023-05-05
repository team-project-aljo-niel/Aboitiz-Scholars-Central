import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Signup service
export const createUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/signup`, user);
  return response;
};

// Login service
export const loginUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/login`, user);
  return response;
};

// Get current user data service 
export const getCurrentUser = async () => {
  const response = await axios.get(`${BASE_URL}/user/details`);
  return response;
}

// Get all User Data service
export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/user`);
  return response;
};

// Put User Access Level
export const updateAccess = async (_id, access) => {
  const response = await axios.put(`${BASE_URL}/user/${_id}`, access);
  return response;
};
