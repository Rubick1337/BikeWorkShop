const Router = require('express')
const router = new Router()
const userController = require('../Controller/UserController')
const  {body} = require("express-validator");
const authMiddleware = require('../Middleware/auth-middleware');

router.post('/registration',body("email").isEmail(),body("password").isLength({min:3,max:32}),userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/',authMiddleware,userController.getAll)
router.get('/:id',authMiddleware, userController.getOne)
router.put("/:id",userController.updateRole)

module.exports = router