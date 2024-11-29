const Router = require("express")
const router = new Router()
const partController = require("../controller/PartController")

router.post("/",partController.creatPart)
router.get("/",partController.getPartAll)
router.get("/:id",partController.getPartOne)
router.delete("/:id",partController.deletePart)
router.put("/",partController.editPart)

module.exports = router