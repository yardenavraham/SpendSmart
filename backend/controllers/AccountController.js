import CashFlow from "../models/CashFlowModel.js";
import Account from "../models/AccountModel.js";

export const saveAccount = async (req, res) => {
    console.log('Saving account ' + JSON.stringify(req.body));
    console.log('Saving account ' + req.body.name);
    try {
        const insertedItem = await new Account(req.body).save();
        res.status(201).json(insertedItem);
    } catch (error) {
        console.log('error ' + JSON.stringify(error));
        res.status(500).json({message: error.message});
    }
}

export const getAccountByName = async (req, res) => {
    try {
        const item = await Account.find({name: req.params.name});
        res.json(item);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

//TODO: update password?

export const saveUser = async (req, res) => {

}

export const updateUser = async (req, res) => {

}

export const deleteUser = async (req, res) => {

}

export const getUser = async (req, res) => {

}

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
