const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,

    },
    maxStudents: {
        type: Number, 
        min: [0, "Course cannot have negative amount of students. "],
    },
    cost: {
        type: Number, 
        default: 0,
        min: [0, "Cost cannot be negative value. "]
    },
}, 
{
    timestamps: true
});

subscriberSchema.methods.getinfo = function() {
    return `Name: ${this.name} Email: ${this.email} Zipcode ${this.zipCode}`
}

module.exports = mongoose.model("Course", courseSchema)