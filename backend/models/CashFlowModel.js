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
    savingType: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    madeBy: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: false
    },
});

export default mongoose.model('CashFlow', CashFlow);