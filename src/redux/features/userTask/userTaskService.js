import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const register = async (userData) => {
  const API_URL = `${BACKEND_URL}api/v1/auth/register`;
  /* http://localhost:3001/api/v1/auth/register */
  const response = await axios.post(API_URL, userData, {
    withCredentials: true,
  });
  return response.data;
};

const login = async (userData) => {
  const API_URL = `${BACKEND_URL}api/v1/auth/login`;
  /* http://localhost:3001/api/v1/auth/signIn */
  const response = await axios.post(API_URL, userData, {
    withCredentials: true,
  });

  return response.data;
};

const logout = async () => {
  const API_URL = `${BACKEND_URL}api/v1/auth/logout`;
  /* http://localhost:3001/api/v1/auth/signIn */
  const response = await axios.post(API_URL, {
    withCredentials: true,
  });

  return response.data;
};

const loginStatus = async () => {
  const API_URL = `${BACKEND_URL}api/v1/auth/loginStatus`;
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const addCard = async (payLoad) => {
  const API_URL = `${BACKEND_URL}api/v1/task/add`;
  const response = await axios.post(API_URL, payLoad, {
    withCredentials: true,
  });
  return response.data;
};

const getCard = async (cardId) => {
  const API_URL = `${BACKEND_URL}api/v1/task/${cardId}`;
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};
const getCards = async (datePreference, status) => {
  const API_URL = `${BACKEND_URL}api/v1/task/all/${datePreference}/${status}`;
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const updateCard = async (cardId, payLoad) => {
  const API_URL = `${BACKEND_URL}api/v1/task/update/${cardId}`;
  const response = await axios.patch(API_URL, payLoad, {
    withCredentials: true,
  });
  return response.data;
};

const updateAssignee = async (payLoad) => {
  const API_URL = `${BACKEND_URL}api/v1/task/assignee/update`;
  const response = await axios.patch(API_URL, payLoad, {
    withCredentials: true,
  });
  return response.data;
};

const updateCardTaskStatus = async (cardId, payLoad) => {
  const API_URL = `${BACKEND_URL}api/v1/task/update/status/${cardId}`;
  const response = await axios.patch(API_URL, payLoad, {
    withCredentials: true,
  });
  return response.data;
};

const deleteCard = async (cardId) => {
  const API_URL = `${BACKEND_URL}api/v1/task/delete/${cardId}`;
  const response = await axios.delete(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const analyticsData = async () => {
  const API_URL = `${BACKEND_URL}api/v1/task/analytics`;
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const updateUser = async (payLoad) => {
  const API_URL = `${BACKEND_URL}api/v1/auth/update`;
  const response = await axios.patch(API_URL, payLoad, {
    withCredentials: true,
  });
  return response.data;
};

const getAllEmail = async () => {
  const API_URL = `${BACKEND_URL}api/v1/auth/emails`;
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const userInfo = async (payLoad) => {
  const API_URL = `${BACKEND_URL}api/v1/auth/userInfo`;
  const response = await axios.get(API_URL, payLoad, {
    withCredentials: true,
  });
  return response.data;
};

const userTaskService = {
  register,
  login,
  addCard,
  getCard,
  getCards,
  updateCard,
  updateCardTaskStatus,
  deleteCard,
  analyticsData,
  updateUser,
  logout,
  updateAssignee,
  getAllEmail,
  loginStatus,
  userInfo,
};

export default userTaskService;
