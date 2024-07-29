const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    splits: {
        equal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        exact: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }],
        percentage: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, percentage: Number }]
    },
    description: { type: String }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
