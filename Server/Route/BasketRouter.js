const Router = require("express")
const router = new Router()
const basketController = require("../controller/basketController")

router.post("/",basketController.createBasket)
router.get("/",basketController.getBasketAll)

module.exports = router