import Income from "../models/IncomeModel.js";
 
export const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find();
        res.json(incomes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getIncomeById = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        res.json(income);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
export const saveIncome = async (req, res) => {
    console.log('here save income');
    const income = new Income(req.body);
    console.log('income ' + income);

    try {
        const insertedincome = await income.save();
        res.status(201).json(insertedincome);
    } catch (error) {
        console.log('error ' + JSON.stringify(error));
        res.status(400).json({message: error.message});
    }
}
 
export const updateIncome = async (req, res) => {
    try {
        console.log('here update income ' + JSON.stringify(req.body));

        const updatedincome = await Income.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedincome);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteIncome = async (req, res) => {
    try {
        console.log('here delete income');
        const deletedincome = await Income.deleteOne({_id:req.params.id});
        res.status(200).json(deletedincome);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}