const Router = require("express")
const router = new Router()
const bikeController = require("../controller/BikeController")

router.post("/",bikeController.createBike)
router.get("/",bikeController.getBikeAll)
router.get("/:id",bikeController.getBikeOne)
router.delete("/:id",bikeController.deleteBike)
router.put("/",bikeController.editBike)

module.exports = router