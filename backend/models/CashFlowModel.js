import mongoose from "mongoose";

const CashFlow = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    madeBy: {
        type: String,
        required: true
    },
});

export default mongoose.model('CashFlow', CashFlow);