const { roomExists, getTextCaption } = require("../sockets/rooms")

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

module.exports = {
  viewer_caption,
}
