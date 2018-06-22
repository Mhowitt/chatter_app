const io = require("./index.js").io;
const { USER_CONNECTED, USER_DISCONNECTED, VERIFY_USERNAME, USER_LOGOUT } = require('../Events.js')
const { createUser, createChat, createMessage } = require('../EventActions.js')
const connectedUser = {}

module.exports = socket => {
  console.log("Socket ID is " + socket.id);

  socket.on(VERIFY_USERNAME, (username, cb) => {
    if (isUser(connectedUser, username)) {
      cb({ isUser: true, user:null })
    } else {
    cb({ isUser:false, user:createUser({username:username}) })
    }
  })

  // socket.on(USER_CONNECTED, (username, cb) => {

  // }
}

  function isUser(listUsers, username) {
    return listUsers[username];
  }

  function addUser(listUsers, username){
    let newList = Object.assign({}, listUsers);
    newList[username.username] = username;
    return newList;

  }

  function removeUser(listUsers, username) {
    let newList = Object.assign({}, listUsers);
    delete newList[username]
    return newList;
  }

