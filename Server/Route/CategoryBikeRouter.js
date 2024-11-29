const Router = require("express")
const router = new Router()
const categoryBikeController = require("../Controller/CategoryBikeController")

router.post("/",categoryBikeController.createCategoryBike)
router.get("/",categoryBikeController.getCategoryBikeAll)
router.get("/:id",categoryBikeController.getCategoryBikeOne)
router.delete("/:id",categoryBikeController.deleteCategoryBike)
router.put("/",categoryBikeController.editCategoryBike)

module.exports = router