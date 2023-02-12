import mongoose from "mongoose";
 
const Income = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    frequency:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        required: false //true
    },
    madeBy:{
        type: String,
        required: false //true
    },
});
 
export default mongoose.model('Incomes', Income);