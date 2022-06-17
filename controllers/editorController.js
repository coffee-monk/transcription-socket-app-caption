const { createRoom, roomExists, getTextRaw } = require("../sockets/rooms")

const editor_index = (req, res) => {
  const room = req.params.room
  if (!roomExists(room)) {
    return res.redirect("/")
  }
  res.render("editor", {
    room: room,
    roomURL: req.protocol + "://" + req.get("host"),
    scrollURL: req.protocol + "://" + req.get("host") + "/viewer/" + room,
    captionURL:
      req.protocol + "://" + req.get("host") + "/viewer/caption/" + room,
    wordURL: req.protocol + "://" + req.get("host") + "/viewer/word/" + room,
    textLoad: getTextRaw(room, "textRaw"),
  })
}

const editor_post = (req, res) => {
  const room = req.body.room
  if (roomExists(room)) {
    return res.redirect("/")
  }
  createRoom(room)
  res.redirect("editor/" + room)
}

module.exports = {
  editor_index,
  editor_post,
}
