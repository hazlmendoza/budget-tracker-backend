import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: false },
    categoryName: { type: String, required: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export const TransactionModel = mongoose.model('Transaction', TransactionSchema)

export const getTransactions = (userId: string) => TransactionModel.find({ userId }).populate('categoryId', 'name type')
export const getTransactionById = (id: string) => TransactionModel.findById(id).populate('categoryId', 'name type')
export const createTransaction = (values: Record<string, any>) => new TransactionModel(values)
    .save().then((transaction)=> transaction.toObject())
export const deleteTransactionById = (id: string) => TransactionModel.findOneAndDelete({_id: id})
export const updateTransactionById = (id: string, values: Record<string, any>) => TransactionModel.findByIdAndUpdate(id, values, { new: true })