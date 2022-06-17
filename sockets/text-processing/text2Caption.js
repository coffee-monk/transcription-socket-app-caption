function text2Caption(output, wordsNumber) {
  // break text into array of words
  const regex = new RegExp(/(\S+[ !?.:;,\n])/g)
  let outputArray = output.match(regex)

  // check that caption words number is even
  if (wordsNumber % 2 !== 0) {
    wordsNumber = 10
  }

  if (outputArray === null) {
    return ""
  }

  // slice words from end of array
  if (outputArray.length % wordsNumber === 0) {
    outputArray = outputArray.slice(-wordsNumber)
  } else {
    const remainder = outputArray.length % (wordsNumber / 2)
    outputArray = outputArray.slice(-remainder + -(wordsNumber / 2))
  }

  // format words into 2 lines of captions
  if (outputArray.length > wordsNumber / 2) {
    outputArray.splice(wordsNumber / 2, 0, "<br/> ")
    return outputArray.join(" ")
  } else {
    return outputArray.join(" ")
  }
}

module.exports = text2Caption
