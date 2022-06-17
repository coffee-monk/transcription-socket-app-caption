const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })

const editorRoutes = require("./routes/editorRoutes")
const viewerRoutes = require("./routes/viewerRoutes")
const joinRoutes = require("./routes/joinRoutes")

require("dotenv").config()

const {
  addUserAsType,
  removeUserById,
  processRoomText,
  getRoomText,
  roomExists,
  roomTimeout,
  getEditors,
  getViewers,
} = require("./sockets/rooms")

// Setup + Global Vars >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const port = process.env.PORT || 3000

const wordsNumber = 10
const timeLimit4Room = 600000 // time limit for room (ms)
const timerInterval = 1 * 60 * 1000

// Views Engine -------------------------------------------
app.set("views", "./views")
app.set("view engine", "ejs")

// Public Folder ------------------------------------------
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

// ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.get("/", (req, res) => {
  res.render("index")
})
app.use("/editor", editorRoutes)
app.use("/viewer", viewerRoutes)
app.use("/join", joinRoutes)

// SOCKET CONNECTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Connection -----------------------------------------------
io.on("connection", socket => {
  const user = {
    id: socket.id,
    room: socket.handshake.query.room,
    type: socket.handshake.query.type,
    timestamp: Date.now(),
  }

  console.log(socket.rooms)

  if (roomExists(user.room)) {
    socket.join(user.room)
    // add user to "editors" or "viewers" lists
    addUserAsType(user, user.type)

    // emit editor dashboard data
    io.in(user.room).emit("dashboard", {
      room: user.room,
      editorsLength: getEditors(user.room).length,
      viewersLength: getViewers(user.room).length,
    })

    console.log(
      "ID: " + user.id + " ROOM: " + user.room + " TYPE: " + user.type
    )
  }

  // [Editor Text] ==> [Viewer Text] ----------------------
  socket.on("text:edit", ({ text, room }) => {
    if (roomExists(room)) {
      processRoomText(text, room, wordsNumber)

      const { textRaw, textScroll, textCaption, textWord } = getRoomText(room)

      // update editor textarea
      socket.to(room).emit("textarea:update", {
        textRaw,
      })

      // emit processed text for viewing
      socket.to(room).emit("text:view", {
        textScroll,
        textCaption,
        textWord,
      })
    }
  })

  // Disconnecting ----------------------------------------
  socket.on("disconnecting", () => {
    console.log(socket.id + " has disconnected")

    // get room of socket
    let room = Array.from(socket.rooms)[1]

    if (roomExists(room)) {
      removeUserById(socket.id, room)

      // update editor dashboard
      io.in(room).emit("dashboard", {
        room,
        editorsLength: getEditors(room).length,
        viewersLength: getViewers(room).length,
      })
    }
  })
})

// Delete room if over limit @ every interval >>>>>>>>>>>>>>
setInterval(() => {
  roomTimeout(timeLimit4Room)
}, timerInterval)

// RUN SERVER ==============================================
if (server.listen(port)) {
  console.log(`Listening on PORT ${port}`)
}
