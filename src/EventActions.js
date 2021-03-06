const uuid = require("uuid/v4");

const createUser = ({ username = "" } = {}) => ({
  id: uuid(),
  username
});

const createMessage = ({ message = "", sender = "" } = {}) => ({
  id: uuid(),
  time: getTime(new Date(Date.now())),
  message,
  sender
});

const createChat = ({ messages = [], name = "Community", users = [], typingUsers = [] } = {}) => ({
  id: uuid(),
  name,
  messages,
  users,
  typingUsers
});

const getTime = date => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createChat,
  createMessage,
  createUser
};
