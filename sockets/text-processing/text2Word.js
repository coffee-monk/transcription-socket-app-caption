function text2Word(output) {
  const regex = new RegExp(/(\S+[ !?.:;,\n])/g)
  let outputArray = output.match(regex)

  if (outputArray === null) {
    return ""
  }

  if (outputArray !== null) {
    return outputArray.slice(-1)[0]
  }
}

module.exports = text2Word
