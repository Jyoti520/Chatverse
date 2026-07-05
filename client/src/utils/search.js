//  filter users through search input
export const filterUsers = (users, search) => {
  if (!search.trim()) {
    return users;
  }
  return users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()),
  );
}

// handle search messages
export const filterMessages = (messages, search) => {
  if (!search.trim()) {
    return messages;
  }
  return messages.filter((message) =>
    message?.content?.toLowerCase().includes(search.toLowerCase()),
  );
};



