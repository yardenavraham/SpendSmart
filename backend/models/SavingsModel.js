import mongoose from "mongoose";

const Saving = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    account: {
        type: String,
        required: false
    },
});

export default mongoose.model('Saving', Saving);