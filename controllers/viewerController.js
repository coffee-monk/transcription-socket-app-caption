const {
  roomExists,
  getTextScroll,
  getTextCaption,
  getTextWord,
} = require("../sockets/rooms")

const viewer_scroll = (req, res) => {
  const room = req.params.room
  if (!roomExists(room)) {
    return res.redirect("/")
  }
  res.render("viewer-scroll", {
    room,
    textLoad: getTextScroll(room),
  })
}

const viewer_caption = (req, res) => {
  const room = req.params.room
  if (!roomExists(room)) {
    return res.redirect("/")
  }
  res.render("viewer-caption", {
    room,
    textLoad: getTextCaption(room),
  })
}

const viewer_word = (req, res) => {
  const room = req.params.room
  if (!roomExists(room)) {
    return res.redirect("/")
  }
  res.render("viewer-word", {
    room,
    textLoad: getTextWord(room),
  })
}

module.exports = {
  viewer_scroll,
  viewer_caption,
  viewer_word,
}
