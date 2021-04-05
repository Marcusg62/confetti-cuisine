const User = require("../models/user");

module.exports = {
	index: (req, res, next) => {
		User.find()
			.then((users) => {
				res.locals.users = users;
				next();
			})
			.catch((error) => {
				console.error("Error fetching user");
				next(error);
			});
	},
	new: (req, res) => {
		res.render("/users/new");
	},
	create: (req, res, next) => {
		let newUser = new User({
			name: {
				first: req.body.first,
				last: req.body.last,
			},
            password: req.body.password,
			email: req.body.email,
			zipCode: req.body.zipCode,
		});

		User.create(newUser)
			.then((user) => {
				res.locals.user = user;
				res.locals.redirect = "/users";
				next();
			})
			.catch((error) => {
				console.error("Error saving user");
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath != undefined) {
			res.redirect(redirectPath);
		} else {
			next();
		}
	},
	show: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
			.then((user) => {
				res.lovals.user = user;
			})
			.catch((error) => {
				console.log("Error fetching user by id. ");
				next(error);
			});
	},
	showView: (req, res) => {
		res.render("/users/show");
	},
	edit: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
			.then((user) => {
				res.render("/users/edit", { user: user });
			})
			.catch((error) => {
				console.error("Error fetching user by id. ");
			});
	},
	update: (req, res, next) => {
		let userId = req.params.id;
		let updatedUser = new User({
			name: {
				first: req.body.first,
				last: req.body.last,
			},
            password: req.body.password,
			email: req.body.email,
			zipCode: req.body.zipCode,
		});

		User.findOneAndUpdate(userId, updatedUser)
			.then((user) => {
				res.locals.user = user;
				res.locals.redirect = `/users/${user._id}`;
				next();
			})
			.catch((error) => {
				console.error("error fetching and updating user");
				next(error);
			});
	},
	delete: (req, res, next) => {
		let userId = req.params.id;
		User.findByIdAndRemove(userId)
			.then(() => {
				res.locals.redirect = "/users";
				next();
			})
			.catch((error) => {
				console.error("error deleting user");
				next(error);
			});
	},
};
