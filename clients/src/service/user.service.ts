import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

interface User {
  name: string;
  email: string;
}

// create a user
export const createUser = async (user: User, toast: any) => {
  try {
    const res = await axios.post(`${baseUrl}/users`, user);
    toast("User created successfully", {
      type: "success",
    });
    return res.data;
  } catch (error: any) {
    toast(error.response.data.message, {
      type: "error",
    });
    return error;
  }
};

// get all users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/users`);
    return res.data;
  } catch (error) {
    return error;
  }
};

// get a user
export const getUser = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/users/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
