const express = require("express")
const app = express()
const homeController = require('./controllers/homeController')
const layouts = require("express-ejs-layouts")
const errorController = require('./controllers/errorController')
const mongoose = require('mongoose')
const subscribersController = require("./controllers/subscribersController")
const methodOverride = require("method-override")
const subscriber = require("./models/subscriber")
const router = express.Router();
mongoose.connect("mongodb+srv://admin:admin123@cluster0.0mkjp.mongodb.net/confetti_cuisine?retryWrites=true&w=majority", { useNewUrlParser: true });
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs")
app.use(layouts)




app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: false
    })
)
app.use(methodOverride("_method", {methods: ["POST", "GET"]}))

router.get('/', homeController.index);


router.get('/subscribers', subscribersController.index, subscribersController.indexView)
router.get("/subscribers/new", subscribersController.new)
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView)
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView)
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView)
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView)





router.get('/users', usersController.index, usersController.indexView)
router.get("/users/new", usersController.new)
router.post("/users/create", usersController.create, usersController.redirectView)
router.get("/users/:id", usersController.show, usersController.showView)
router.put("/users/:id/update", usersController.update, usersController.redirectView)
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView)


router.get('/courses', coursesController.index, coursesController.indexView)
router.get("/courses/new", coursesController.new)
router.post("/courses/create", coursesController.create, coursesController.redirectView)
router.get("/courses/:id", coursesController.show, coursesController.showView)
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView)
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView)




router.post('/subscribe', subscribersController.saveSubscriber) 

app.use(errorController.pageNotFoundError)
app.use(errorController.internalServerError)


app.use(express.json())

app.use("/", router)

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)

})