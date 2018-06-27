const io = require("./index.js").io;
const { USER_CONNECTED, USER_DISCONNECTED, VERIFY_USERNAME, USER_LOGOUT } = require('../Events.js')
const { createUser, createChat, createMessage } = require('../EventActions.js')
let connectedUsers = {}

module.exports = (socket) => {
  console.log("Socket ID is " + socket.id);

  socket.on(VERIFY_USERNAME, (username, cb) => {
    if (isUser(connectedUsers, username)) {
      cb({ isUser: true, user: null})
    } else {
    cb({ isUser:false, user:createUser({username:username}) })
    }
  })

  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user;
    io.emit(USER_CONNECTED, connectedUsers)
    console.log(connectedUsers)
  })
}

  function isUser(listUsers, username) {
    return username in listUsers;
  }

  function addUser(listUsers, user){
    let newList = Object.assign({}, listUsers);
    newList[user.username] = user;
    return newList;

  }

  function removeUser(listUsers, username) {
    let newList = Object.assign({}, listUsers);
    delete newList[username]
    return newList;
  }

