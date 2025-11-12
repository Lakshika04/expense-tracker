import express from 'express'
import verifyToken from '../middleware/auth.middleware.js';
import { addExpense, deleteExpense, getExpense, getTotalExpense, updateExpense } from '../controllers/expense.controller.js';

const expenseRouter= express.Router();

expenseRouter.post('/add',verifyToken,addExpense)
expenseRouter.get('/',verifyToken,getExpense)
expenseRouter.put('/:id',verifyToken,updateExpense)
expenseRouter.delete('/:id',deleteExpense)
expenseRouter.get('/get',verifyToken,getTotalExpense)


export default expenseRouter