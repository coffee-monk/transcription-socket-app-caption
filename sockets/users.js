const users = {}

function formatUser(id, type, room) {
  const user = { id, type, room, timestamp: Date.now() }

  users.push(user)

  return user
}

module.exports = {
  formatUser,
}
