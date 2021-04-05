const mongoose = require('mongoose')

const subscriberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number, 
        min: [1000, "Zip code too short"],
        max: 99999
    },
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: Course}],
}, 
{
    timestamps: true
});

subscriberSchema.methods.getinfo = function() {
    return `Name: ${this.name} Email: ${this.email} Zipcode ${this.zipCode}`
}

module.exports = mongoose.model("Subscriber", subscriberSchema)