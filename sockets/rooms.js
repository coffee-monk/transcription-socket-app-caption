const text2Scroll = require("./text-processing/text2Scroll")
const text2Caption = require("./text-processing/text2Caption")
const text2Word = require("./text-processing/text2Word")

const rooms = {}

function createRoom(room) {
  if (!Object.keys(rooms).includes(room)) {
    rooms[room] = {
      name: room,
      timestamp: Date.now(),
      editors: [],
      viewers: [],
      textRaw: [],
      textScroll: [],
      textCaption: [],
      textWord: [],
    }
  }
}

function getRooms() {
  return rooms
}

function roomExists(room) {
  return Object.keys(rooms).includes(room)
}

function addUserAsType(user, type) {
  if (type === "editor") {
    addEditor(user)
  } else if (type === "viewer") {
    addViewer(user)
  }
}

function removeUserById(id, room) {
  removeEditor(id, room)
  removeViewer(id, room)
}

function processRoomText(text, room, wordsNumber) {
  if (Object.keys(rooms).includes(room)) {
    rooms[room].textRaw = text
    rooms[room].textScroll = text2Scroll(text)
    rooms[room].textCaption = text2Caption(text, wordsNumber)
    rooms[room].textWord = text2Word(text)
  }
}

function getRoomText(room) {
  if (Object.keys(rooms).includes(room)) {
    return {
      textRaw: rooms[room].textRaw,
      textScroll: rooms[room].textScroll,
      textCaption: rooms[room].textCaption,
      textWord: rooms[room].textWord,
    }
  }
}

function getTextRaw(room) {
  if (Object.keys(rooms).includes(room)) {
    return rooms[room].textRaw
  }
}

function getTextScroll(room) {
  if (Object.keys(rooms).includes(room)) {
    return rooms[room].textScroll
  }
}

function getTextCaption(room) {
  if (Object.keys(rooms).includes(room)) {
    return rooms[room].textCaption
  }
}

function getTextWord(room) {
  if (Object.keys(rooms).includes(room)) {
    return rooms[room].textWord
  }
}

function addEditor(user) {
  const { room, id } = user
  if (!rooms[room].editors.some(editor => editor.id === id)) {
    rooms[room].editors.push(user)
  }
}

function removeEditor(id, room) {
  if (rooms[room].editors.some(editor => editor.id === id)) {
    const index = rooms[room].editors.findIndex(editor => editor.id === id)
    if (index !== -1) {
      rooms[room].editors.splice(index, 1)
    }
  }
}

function addViewer(user) {
  const { room, id } = user
  if (!rooms[room].viewers.some(viewer => viewer.id === id)) {
    rooms[room].viewers.push(user)
  }
}

function removeViewer(id, room) {
  if (rooms[room].viewers.some(viewer => viewer.id === id)) {
    const index = rooms[room].viewers.findIndex(viewer => viewer.id === id)
    if (index !== -1) {
      rooms[room].viewers.splice(index, 1)
    }
  }
}

function getEditors(room) {
  return rooms[room].editors
}

function getViewers(room) {
  return rooms[room].viewers
}

function roomTimeout(timeLimit) {
  for (const room in rooms) {
    if (Date.now() - rooms[room].timestamp > timeLimit) {
      delete rooms[room]
    }
  }
}

module.exports = {
  getRooms,
  createRoom,
  addUserAsType,
  removeUserById,
  processRoomText,
  roomTimeout,
  getRoomText,
  roomExists,
  getEditors,
  getViewers,
  getTextScroll,
  getTextCaption,
  getTextWord,
  getTextRaw,
}
