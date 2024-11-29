//чтоб считать файл env
require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const cors = require('cors')
const models = require("./Models/models")
const router = require("./Route/indexRoute")
const PORT = process.env.PORT || 5000
const errorHandler = require("./Middleware/ErrorHandlingMiddleware")
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


//в самом конце должен быть middleware!
app.use(errorHandler)
// app.get('/',(req, res) => {
//     res.status(200).json({message: "Welcome to the server"})
// })
const start = async () => {
    try{
       await sequelize.authenticate()
       await sequelize.sync()
       app.listen(PORT,()=> console.log("Server started on port "+ PORT))
    }
    catch(e) {
        console.log(e)
    }
}
start()