const User = require("../models/user");

module.exports = {
	index: (req, res, next) => {
		User.find({})
			.then((users) => {
				res.locals.users = users;
				next();
			})
			.catch((error) => {
				console.error("Error fetching user");
				next(error);
			});
	},
	indexView: (req, res) => {
		// console.log("res.locals.....", res.locals);
		res.render("users/index");
	},
	new: (req, res) => {
		res.render("users/new");
	},
	create: (req, res, next) => {
		let newUser = new User({
			name: {
				first: req.body.first,
				last: req.body.last,
			},
			email: req.body.email,
			password: req.body.password,
			zipCode: req.body.zipCode
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
	show: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
			.then((user) => {
				res.locals.user = user;
				next();
			})
			.catch((error) => {
				console.log("Error fetching user by id. ");
				next(error);
			});
	},
	showView: (req, res) => {
		res.render("users/show");
	},
	edit: (req, res, next) => {
		let userId = req.params.id;
		User.findById(userId)
			.then((user) => {
				res.render("users/edit", { user: user });
			})
			.catch((error) => {
				console.error("Error fetching user by id. ");
			});
	},
	update: async (req, res, next) => {
		let userId = req.params.id;
		console.log("edit data: ", req.body);

		let updatedUser = {
			name: {
				first: req.body.first,
				last: req.body.last,
			},
			email: req.body.email,
			password: req.body.password,
			zipCode: req.body.zipCode
		};

		try {
			console.log("user id", userId);
			const doc = await User.findById(userId);
			console.log("found user", doc);
			await User.findByIdAndUpdate(userId, {
				$set: updatedUser,
			});
			res.locals.redirect = `/users/${doc._id}`;
			next();
		} catch (error) {
			console.error(error);
			next(error);
		}
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
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(redirectPath);
		else next();
	},
};
