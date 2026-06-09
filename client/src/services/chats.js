import API from "./api";

export const fetchChats = async () => {
  try {
    //api call
    const { data } = await API.get("/chat");
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status || 0;
    const message = error.response?.data.message || "something went wrong";
   // console.error(error.message || error);
    throw { status, message };
  }
};
export const accessChat = async (userId) => {
  try {
    //api call
    const { data } = await API.post("/chat/access", { userId });
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status || 0;
    const message = error.response?.data.message || "something went wrong";
   // console.error(error.message || error);
    throw { status, message };
  }
};



export const markRead = async (chatId) => {
  try {
    //api call
    const { data } = await API.put(`/chat/read/${chatId}`);
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status || 0;
    const message = error.response?.data.message || "something went wrong";
    //console.error("failed to marked a read", error);
    throw { status, message };
  }
};


