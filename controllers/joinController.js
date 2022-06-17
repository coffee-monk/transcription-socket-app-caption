const join_index = (req, res) => {
  res.render("join")
}

const join_room = (req, res) => {
  const rooms = req.app.get("rooms")
  console.log(rooms)
  console.log(req.params.room)
  if (Object.keys(rooms).includes(req.params.room) === false) {
    return res.redirect("/join")
  }
  res.redirect(`/output/${req.params.room}`)
}

const join_post = (req, res) => {
  const rooms = req.app.get("rooms")
  if (Object.keys(rooms).includes(req.body.room) === false) {
    return res.redirect("/join")
  }
  res.redirect(`/output/${req.body.room}`)
}

module.exports = {
  join_index,
  join_post,
  join_room,
}
