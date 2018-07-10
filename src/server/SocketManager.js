const io = require("./index.js").io;
const { USER_CONNECTED, USER_DISCONNECTED, VERIFY_USERNAME,
  USER_LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED,
  MESSSAGE_SENT, TYPING } = require('../Events.js')
const { createUser, createChat, createMessage } = require('../EventActions.js')
let connectedUsers = {}

let generalChat = createChat()


module.exports = (socket) => {
  console.log("Socket ID is " + socket.id);
  let sentUserMessage, sendUserTyping;

  //User socket functions
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
    sentUserMessage = sendMessage(user.username)
    sendUserTyping = sendTypingAction(user.username)

    io.emit(USER_CONNECTED, connectedUsers)
    console.log(connectedUsers)
  })

  // socket.on('disconnect', () => {
  //   if ("user" in socket) {
  //     connectedUsers = removeUser(connectedUsers, socket.user.username)
  //     io.emit(USER_DISCONNECTED, connectedUsers)
  //     console.log("Disconnected User: " + socket.user.username)
  //   }
  // })

  socket.on(USER_LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.username)
    io.emit(USER_DISCONNECTED, connectedUsers)
      console.log("Disconnected User: " + socket.user.username)
  })

//create the chat/grabbing chat
  socket.on(COMMUNITY_CHAT, (cb) => {
    console.log(generalChat)

    cb(generalChat);
  })

//message functions
  socket.on(MESSSAGE_SENT, ( {chatId, message} ) => {
    sentUserMessage(chatId, message)
  })

  socket.on(TYPING, ( {chatId, isTyping} ) => {
    sendUserTyping(chatId, isTyping)
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

function sendMessage(sender) {
  return (chatId, message) => {
    io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}))
  }
}

function sendTypingAction(user) {
  return (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, {user, isTyping})
  }
}