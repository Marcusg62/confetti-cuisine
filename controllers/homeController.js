var courses = [
    {
        title: "Rasberry Cake",
        cost: 50
    },
    {
        title: "Soup",
        cost: 50
    },
    {
        title: "Chips",
        cost: 50
    },
    {
        title: "Bread",
        cost: 50
    },
    {
        title: "Donuts",
        cost: 50
    },
]
exports.index = (req, res) => {
    res.render('index')
}
exports.showCourses = (req, res) => {
    res.render('courses', { offeredCourses: courses })
}

exports.showSignUp = (req, res) => {
    res.render("contact")
}

exports.postedSignUpForm = (req, res) => {
    res.render("thanks")

}