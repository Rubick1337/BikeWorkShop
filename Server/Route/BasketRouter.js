const Router = require("express")
const router = new Router()
const basketController = require("../controller/basketController")

router.post("/",basketController.createBasket)
router.get("/",basketController.getBasketAll)
router.get("/:id",basketController.getBasketNull)
router.put("/:id",basketController.editBasket)
router.put("/status:id",basketController.editBasketStatus)
router.get('/items/:id_user', basketController.getBasketItems);

module.exports = router