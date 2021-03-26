const Subscriber = require('../models/subscriber');

exports.getAllSubscribers = (req, res) => {
    Subscriber.find({}).exec()
        .then(subscribers => {
            res.render("subscribers", { subscribers: subscribers })
        })
        .catch(err => {
            console.log(err)
            return []
        }).then(() => {
            console.log("promise complete")
        })
}

exports.getSubscriptionPage = (req, res) => {
    res.render("contact")
}

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    }).save().then(() => {
        res.render("thanks")
    })
        .catch((err) => {
            res.send(err)
        })
}