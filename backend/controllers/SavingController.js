import Saving from "../models/SavingModel.js";

export const getSaving = async (req, res) => { //getSaving
    try {
        console.log('getSaving');
        console.log('req.params  ' + JSON.stringify(req.params));
        const savingData = await Saving.find({ account: req.params.account });
        res.json(savingData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSavingById = async (req, res) => { //getSavingById
    try {
        const item = await Saving.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const saveSavingItem = async (req, res) => { //saveIncome

    console.log('here add saving');
    const savingItem = new Saving(req.body);
    savingItem.account = req.params.account;
    console.log('saving ' + savingItem);

    try {
        const insertedItem = await savingItem.save();
        res.status(201).json(insertedItem);
    } catch (error) {
        console.log('error ' + JSON.stringify(error));
        res.status(400).json({ message: error.message });
    }
}

export const updateSavingItem = async (req, res) => { //updateSaving
    try {
        console.log('here update saving ' + JSON.stringify(req.body));

        const updatedItem = await Saving.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteSavingItem = async (req, res) => { //deleteSaving
    try {
        console.log('here delete Saving');
        const deletedItem = await Saving.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}