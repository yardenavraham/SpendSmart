import express from "express";
import { 
    getSaving, 
    getSavingById,
    saveSavingItem,
    updateSavingItem,
    deleteSavingItem
} from "../controllers/SavingController.js";
const router = express.Router();
 
router.get('/Saving/:account', getSaving);
router.get('/Saving/:id', getSavingById);
router.post('/Saving/:account', saveSavingItem);
router.patch('/Saving/:id', updateSavingItem);
router.delete('/Saving/:id', deleteSavingItem);
 
export default router;

