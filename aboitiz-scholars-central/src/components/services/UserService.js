import axios from 'axios';

// For client to recognize cookies being sent by the backend
axios.defaults.withCredentials = true;

// const BASE_URL = 'https://aboitizscholarscentral-api.onrender.com';
const BASE_URL = 'http://localhost:8080';

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
};

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
  const response = await axios.post(
    `${BASE_URL}/scholar/details`,
    scholarDetails
  );
  return response;
};

// Put Scholar Details
export const updateScholarDetails = async (id, scholarDetails) => {
  const response = await axios.put(
    `${BASE_URL}/scholar/details/${id}`,
    scholarDetails
  );
  return response;
};

// Put Current Scholar Details
export const updateCurrentScholar = async (scholarDetails) => {
  const response = await axios.put(
    `${BASE_URL}/scholar/details`,
    scholarDetails
  );
  return response;
};

// Get all User Grades Service
export const getGrades = async () => {
  const response = await axios.get(`${BASE_URL}/grades`);
  return response;
};

// Post scholar grades service
export const createGrades = async (id, gradeDetails) => {
  const response = await axios.post(`${BASE_URL}/grades/${id}`, gradeDetails);
  return response;
};

// Post scholar grades service
export const updateGrades = async (id, gradeDetails) => {
  const response = await axios.put(`${BASE_URL}/grades/${id}`, gradeDetails);
  return response;
};

function replaceAccessToken() {
  try {
    // Send a request to the server to get a new access token
    axios
      .get(`${BASE_URL}/getAccessToken`)
      .then((response) => {
        // Get the new access token from the response
        const newAccessToken = response.data.accessToken;

        // Set the new access token in local storage
        localStorage.setItem('token-auth', newAccessToken);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

// Call the replaceAccessToken function every 15 minutes
setInterval(replaceAccessToken, 300000); // 15 minutes in milliseconds
