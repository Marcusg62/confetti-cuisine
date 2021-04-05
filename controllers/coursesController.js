const Course = require("../models/course");

module.exports = {
	index: (req, res, next) => {
		Course.find()
			.then((courses) => {
				res.locals.courses = courses;
				next();
			})
			.catch((error) => {
				console.error("Error fetching course");
				next(error);
			});
	},
	new: (req, res) => {
		res.render("/courses/new");
	},
	create: (req, res, next) => {
		let newCourse = new Course({
			title: req.body.title,
            description: req.body.description,
			maxStudents: req.body.maxStudents,
			cost: req.body.cost,
		});

		Course.create(newCourse)
			.then((course) => {
				res.locals.course = course;
				res.locals.redirect = "/courses";
				next();
			})
			.catch((error) => {
				console.error("Error saving course");
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
		let courseId = req.params.id;
		Course.findById(courseId)
			.then((course) => {
				res.lovals.course = course;
			})
			.catch((error) => {
				console.log("Error fetching course by id. ");
				next(error);
			});
	},
	showView: (req, res) => {
		res.render("/courses/show");
	},
	edit: (req, res, next) => {
		let courseId = req.params.id;
		Course.findById(courseId)
			.then((course) => {
				res.render("/courses/edit", { course: course });
			})
			.catch((error) => {
				console.error("Error fetching course by id. ");
			});
	},
	update: (req, res, next) => {
		let courseId = req.params.id;
		let updatedCourse = new Course({
			title: req.body.title,
            description: req.body.description,
			maxStudents: req.body.maxStudents,
			cost: req.body.cost, 
		});

		Course.findOneAndUpdate(courseId, updatedCourse)
			.then((course) => {
				res.locals.course = course;
				res.locals.redirect = `/courses/${course._id}`;
				next();
			})
			.catch((error) => {
				console.error("error fetching and updating course");
				next(error);
			});
	},
	delete: (req, res, next) => {
		let courseId = req.params.id;
		Course.findByIdAndRemove(courseId)
			.then(() => {
				res.locals.redirect = "/courses";
				next();
			})
			.catch((error) => {
				console.error("error deleting course");
				next(error);
			});
	},
};
