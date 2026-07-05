export const formattedTime = (timestamp) => {
  return timestamp
    ? new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
};

export const formatUserName = (name) => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Deleted User";
};
