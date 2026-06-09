import API from "./api";

export const signup = async (formData) => {
  try {
    const { data } = await API.post("/auth/signup", formData);
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status || 0;
    const message = error.response?.data?.message || "something went wrong";
    throw { status, message };
  }
};

export const login = async (credentials) => {
  try {
    const { data } = await API.post("/auth/login", credentials);
    return data;
  } catch (error) {
    const status = error.response?.status || 0;
    const message = error.response?.data?.message || "something went wrong";
    throw { status, message };
  }
};


export const fetchCurrentUser = async () => {
  try {
    const { data } = await API.get("/auth/me");
    return data.user;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data.message || "something went wrong";
    //console.error("user not logged in", error.message || error);
    throw { status, message };
  }
};

export const getUsers = async () => {
  try {
    //api call
    const { data } = await API.get("/auth");
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status;
    const message = error.response?.data?.message || "something went wrong";
    //console.error("Unable to fetch users", error.message || error);
    throw { status, message };
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await API.post("/auth/logout", {});
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status || 0;
    const message = error.response?.message || "something went wrong";
    throw { status, message };
  }
};
