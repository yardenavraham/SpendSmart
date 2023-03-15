import Saving from "../models/SavingModel.js";
 
export const getSaving = async (req, res) => { //getSaving
    try {
        console.log('getSaving');
        console.log('req.params  ' + JSON.stringify(req.params ));
        const savingData = await Saving.find({ account: req.params.account });
        res.json(savingData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getSavingById = async (req, res) => { //getSavingById
    try {
        const item = await Saving.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
  }
 
export const saveSavingItem = async (req, res) => { //saveIncome
    console.log('saveCashFlowItem');
    console.log('req.body', JSON.stringify(req.body));

    try {
        const savingItem = req.body;
        savingItem.account = req.params.account;
        console.log('SavingItem', JSON.stringify(savingItem));   
        const transactions = [];
        const frequency = savingItem.frequency;

        for (let i = 0; i < frequency; i++) {
            transactions[i] = {...savingItem};        
            transactions[i].date = addMonths(new Date(savingItem.date), i);
            console.log("transactions[i] " + JSON.stringify(transactions[i]));
        }

        console.log('transactions', transactions);
        const insertedArr = await Saving.insertMany(transactions).catch(err => console.log(JSON.stringify(err)));
        res.status(201).json(insertedArr);
    } catch (error) {
        console.log('error ' + error);
        res.status(400).json({ message: error.message });
    }
}
 
export const updateSavingItem = async (req, res) => { //updateSaving
    try {
        console.log('here update saving ' + JSON.stringify(req.body));

        const updatedItem = await Saving.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteSavingItem = async (req, res) => { //deleteSaving
    try {
        console.log('here delete Saving');
        const deletedItem = await Saving.deleteOne({_id:req.params.id});
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}