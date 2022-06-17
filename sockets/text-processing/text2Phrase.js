function text2Phrase(output, wordsNumber) {
  const regex = new RegExp(/(\S+[ !?.:;,\n])/g)
  let outputArray = output.match(regex)

  // console.log(outputArray)

  // if (outputArray === null || outputArray.length < wordsNumber) {
  //   return "default"
  // } else if (outputArray.length % wordsNumber === 0) {
  //   // outputArray.splice(4, 0, "TEST ")
  //   outputArray = outputArray.slice(-wordsNumber)
  //   outputArray.splice(5, 0, "<br/> ")
  //   return outputArray.join(" ")
  // } else {
  //   return false
  // }

  if (
    outputArray !== null &&
    outputArray.length >= wordsNumber &&
    outputArray.length % wordsNumber === 0
  ) {
    outputArray = outputArray.slice(-wordsNumber)
    outputArray.splice(5, 0, "<br/> ")
    return outputArray.join(" ")
  }
}

module.exports = text2Phrase
