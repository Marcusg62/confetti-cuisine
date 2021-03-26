const express = require("express")
const app = express()
const homeController = require('./controllers/homeController')
const layouts = require("express-ejs-layouts")
const errorController = require('./controllers/errorController')
const mongoose = require('mongoose')
const subscribersController = require("./controllers/subscribersController")

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

app.get('/', homeController.index);

app.get('/courses', homeController.showCourses);
app.get('/contact', subscribersController.getSubscriptionPage);
// app.post('/contact', homeController.postedSignUpForm);

app.get('/subscribers', subscribersController.getAllSubscribers)
app.post('/subscribe', subscribersController.saveSubscriber)

app.use(errorController.pageNotFoundError)
app.use(errorController.internalServerError)


app.use(express.json())

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)

})