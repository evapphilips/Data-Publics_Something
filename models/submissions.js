// Require Libraries
const mongoose = require('mongoose')

// Define user schema
const submissionSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    }

})

// Export user schema
module.exports = mongoose.model('Submission', submissionSchema)