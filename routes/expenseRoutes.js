const express = require('express');
const router = express.Router();
const { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addExpense);
router.get('/user/:userId', authMiddleware, getUserExpenses);
router.get('/overall', authMiddleware, getOverallExpenses);
router.get('/download', authMiddleware, downloadBalanceSheet);

module.exports = router;
