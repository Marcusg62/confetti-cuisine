const Subscriber = require('../models/subscriber');

module.exports = {
    index: (req, res, next) => {
        Subscriber.find()
        .then(subscribers => {
            res.locals.subscribers = subscribers
            next()
        })
        .catch(error => {
            console.error("Error fetching subscriber")
            next(error)
        })
    },
    new: (req, res) => {
        res.render("/subscribers/new")
    },
    create: (req, res, next) => {
        let newSubscriber = new Subscriber({
            name: req.body.name, 
            email: req.body.email, 
            zipCode: req.body.zipCode
        });

        Subscriber.create(newSubscriber)
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            res.locals.redirect = "/subscribers";
            next();
        }).catch(error => {
            console.error("Error saving user")
            next(error)
        })
    },
    redirectView:  (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) {
            res.redirect(redirectPath)
        }
        else {
            next()
        }
    },
    show: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber => {
            res.lovals.subscriber = subscriber;
        }).catch(error => {
            console.log("Error fetching subscriber by id. ")
            next(error)

        })
    },
    showView: (req, res) => {
        res.render("/subscribers/show")
    },
    edit: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber => {
            res.render("/subscribers/edit", {subscriber: subscriber})
        }).catch(error => {
            console.error("Error fetching subscriber by id. ")
        })
    }, 
    update: (req, res, next) => {
        let subscriberId = req.params.id; 
        let updatedSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        })

        Subscriber.findOneAndUpdate(subscriberId, updatedSubscriber)
        .then(subscriber => {
            res.locals.subscriber = subscriber
            res.locals.redirect = `/subscribers/${subscriber._id}`;
            next()
        }).catch(error => {
            console.error("error fetching and updating subscriber")
            next (error)
        })
    },
    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
        .then(() => {
            res.locals.redirect = "/subscribers";
            next();
        })
        .catch(error => {
            console.error("error deleting user")
            next(error)
        })
    }
}