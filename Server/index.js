//чтоб считать файл env
require("dotenv").config()

const express = require("express")
const connectDB = require("./db")
const cors = require('cors')
const models = require("./Models/models")
const router = require("./Route/indexRoute")
const path = require("path")
const errorHandler = require("./Middleware/ErrorHandlingMiddleware")
const app = express()
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'http://localhost', credentials: true }));
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use('/api', router)

//в самом конце должен быть middleware!
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log("Server started on port " + PORT));
    } catch (e) {
        console.log(e);
    }
};

start();