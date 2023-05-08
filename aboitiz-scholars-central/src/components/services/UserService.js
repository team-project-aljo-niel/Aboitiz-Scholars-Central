import axios from "axios";

// const BASE_URL = "https://aboitizscholarscentral-api.onrender.com";
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

// Get all Scholar Data service
export const getScholars = async () => {
  const response = await axios.get(`${BASE_URL}/scholar`);
  return response;
};

// Put User Access Level
export const updateAccess = async (_id, access) => {
  const response = await axios.put(`${BASE_URL}/user/${_id}`, access);
  return response;
};

// Put User Basic Profile
export const updateProfile = async (profile) => {
  const response = await axios.put(`${BASE_URL}/user/details`, profile);
  return response;
};

// Put User Account Details
export const updateAccount = async (account) => {
  const response = await axios.put(`${BASE_URL}/user/account`, account);
  return response;
};

// Post Scholar Details
export const addScholarDetails = async (scholarDetails) => {
  const response = await axios.post(`${BASE_URL}/scholar/details`, scholarDetails);
  return response;
};

// Put Current Scholar Details
export const updateCurrentScholar = async (scholarDetails) => {
  const response = await axios.put(`${BASE_URL}/scholar/details`, scholarDetails);
  return response;
};

// Put Scholar Details
export const updateScholarDetails = async (id, scholarDetails) => {
  const response = await axios.put(`${BASE_URL}/scholar/details/${id}`, scholarDetails);
  return response;
};
