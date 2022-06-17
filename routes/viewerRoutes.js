const express = require("express")
const router = express.Router()

const viewerController = require("../controllers/viewerController")

router.get("/:room", viewerController.viewer_caption)

module.exports = router
