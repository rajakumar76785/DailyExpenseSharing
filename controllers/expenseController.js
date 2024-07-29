const Expense = require('../models/Expense');
const User = require('../models/User');

// Add an expense
exports.addExpense = async (req, res) => {
    const { amount, participants, splits, description } = req.body;
    try {
        const newExpense = new Expense({ amount, participants, splits, description });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get individual user expenses
exports.getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ participants: req.params.userId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get overall expenses
exports.getOverallExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Download balance sheet
exports.downloadBalanceSheet = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('participants');
        
        let userExpenses = {};
        let overallExpenses = 0;
        
        for (let expense of expenses) {
            const { amount, participants, splits } = expense;
            overallExpenses += amount;

            participants.forEach(user => {
                if (!userExpenses[user._id]) {
                    userExpenses[user._id] = {
                        name: user.name,
                        totalOwed: 0
                    };
                }
                
                let splitAmount = 0;
                
                if (splits.equal && splits.equal.includes(user._id)) {
                    splitAmount += amount / participants.length;
                }

                if (splits.exact) {
                    const exactSplit = splits.exact.find(split => split.user.toString() === user._id.toString());
                    if (exactSplit) splitAmount += exactSplit.amount;
                }

                if (splits.percentage) {
                    const percentSplit = splits.percentage.find(split => split.user.toString() === user._id.toString());
                    if (percentSplit) splitAmount += (percentSplit.percentage / 100) * amount;
                }

                userExpenses[user._id].totalOwed += splitAmount;
            });
        }

        res.json({
            overallExpenses,
            userExpenses
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
