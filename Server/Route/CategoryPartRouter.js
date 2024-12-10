const Router = require("express")
const router = new Router()
const categoryPartController = require("../Controller/CategoryPartController")

router.post("/",categoryPartController.createCategoryPart)
router.get("/",categoryPartController.getCategoryPartAll)
router.get("/:id",categoryPartController.getCategoryPartOne)
router.delete("/:id",categoryPartController.deleteCategoryPart)
router.put("/",categoryPartController.editCategoryPart)

module.exports = router