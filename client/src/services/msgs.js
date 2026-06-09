import API from "./api.js";

//send message
export const createMessage = async (newMessage, selectedChatId) => {
  try {
    //api call
    const { data } = await API.post("/msg/send", {
      content: newMessage,
      chatId: selectedChatId,
    });
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status || 500;
    const message = error.response?.message || "something went wrong";
   // console.error("Message send failed!", error.message || error);
    throw { status, message };
  }
};

// fetched all messages
export const fetchMessages = async (chatId) => {
  try {
    //api call
    const { data } = await API.get(`/msg/${chatId}`);
    return data;
  } catch (error) {
    //handle error
    const status = error.response?.status || 500;
    const message = error.response?.data.message || "something went wrong";
    //console.error("failed to get messages", error.message || error);
    throw { status, message };
  }
};

export const deleteMessages= async (chatId, year, month) => {
  
  try {
    const { data } = await API.delete("/msg/delete-month", {
      data: { chatId, year, month },
    });
    return data;
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Something went wrong";

    //console.error("Failed to delete messages", error);

    throw { status, message };
  }
};
