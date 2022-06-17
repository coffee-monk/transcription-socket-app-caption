function text2Scroll(output) {
  const regex = new RegExp(/(\S+[ !?.:;,\n]|\n)/g)
  let outputArray = output.match(regex)

  if (outputArray === null) {
    return ""
  } else {
    outputArray = outputArray.join(" ").replace(/\n\s+/g, "<br>")
    return outputArray
  }
}

module.exports = text2Scroll
