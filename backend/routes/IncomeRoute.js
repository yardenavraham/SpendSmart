import express from "express";
import { 
    getCashFlow, 
    getCashFlowById,
    saveCashFlowItem,
    updateCashFlowItem,
    deleteCashFlowItem
} from "../controllers/CashFlowController.js";
const router = express.Router();
 
router.get('/CashFlow/:account', getCashFlow);
router.get('/CashFlow/:id', getCashFlowById);
router.post('/CashFlow/:account', saveCashFlowItem);
router.patch('/CashFlow/:id', updateCashFlowItem);
router.delete('/CashFlow/:id', deleteCashFlowItem);
 
export default router;

// router.get('/CashFlow', getCashFlow);
// router.get('/CashFlow/:id', getCashFlowById);
// router.post('/CashFlow', saveCashFlowItem);
// router.patch('/CashFlow/:id', updateCashFlowItem);
// router.delete('/CashFlow/:id', deleteCashFlowItem);
 
