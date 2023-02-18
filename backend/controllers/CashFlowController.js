import CashFlow from "../models/CashFlowModel.js";
 
export const getCashFlow = async (req, res) => { //getIncomes
    try {
        const cashFlowData = await CashFlow.find();
        res.json(cashFlowData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getCashFlowById = async (req, res) => { //getIncomeById
    try {
        const item = await CashFlow.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
export const saveCashFlowItem = async (req, res) => { //saveIncome
    console.log('here save income');
    const cashFlowItem = new CashFlow(req.body);
    console.log('income ' + cashFlowItem);

    try {
        const insertedItem = await cashFlowItem.save();
        res.status(201).json(insertedItem);
    } catch (error) {
        console.log('error ' + JSON.stringify(error));
        res.status(400).json({message: error.message});
    }
}
 
export const updateCashFlowItem = async (req, res) => { //updateIncome
    try {
        console.log('here update income ' + JSON.stringify(req.body));

        const updatedItem = await CashFlow.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteCashFlowItem = async (req, res) => { //deleteIncome
    try {
        console.log('here delete income');
        const deletedItem = await CashFlow.deleteOne({_id:req.params.id});
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}