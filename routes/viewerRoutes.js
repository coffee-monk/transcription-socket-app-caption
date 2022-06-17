const express = require("express")
const router = express.Router()

const viewerController = require("../controllers/viewerController")

router.get("/:room", viewerController.viewer_scroll)
router.get("/scroll/:room", viewerController.viewer_scroll)
router.get("/caption/:room", viewerController.viewer_caption)
router.get("/word/:room", viewerController.viewer_word)

module.exports = router
