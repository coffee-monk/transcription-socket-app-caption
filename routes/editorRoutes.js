const express = require("express")
const router = express.Router()

const editorController = require("../controllers/editorController")

router.post("/", editorController.editor_post)
router.get("/:room", editorController.editor_index)

module.exports = router
