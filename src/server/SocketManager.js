const io = require("./index.js").io;

module.exports = socket => {
  console.log("Socket ID is " + socket.id);
};
