import express from "express";
import { 
    getIncomes, 
    getIncomeById,
    saveIncome,
    updateIncome,
    deleteIncome
} from "../controllers/IncomeController.js";
const router = express.Router();
 
router.get('/Incomes', getIncomes);
router.get('/Incomes/:id', getIncomeById);
router.post('/Incomes', saveIncome);
router.patch('/Incomes/:id', updateIncome);
router.delete('/Incomes/:id', deleteIncome);
 
export default router;