const mongoose = require("mongoose");



const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    live: {
        type: String,
        required: true,
        trim: true
    },
    github: {
        type: String,
        required: true,
        trim: true
    },
    aos: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })


const ProjectModel = new mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
