const Router = require("express")
const router = new Router()
const categoryServiceController = require("../Controller/CategoryServiceController")

router.post("/",categoryServiceController.createCategoryService)
router.get("/",categoryServiceController.getCategoryServiceAll)
router.get("/:id",categoryServiceController.getCategoryServiceOne)
router.delete("/:id",categoryServiceController.deleteCategoryService)
router.put("/",categoryServiceController.editCategoryService)

module.exports = router