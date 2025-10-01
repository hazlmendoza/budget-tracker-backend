import mongoose from 'mongoose'

const BudgetSchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    amount: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export const BudgetModel = mongoose.model('Budget', BudgetSchema)

export const getBudgets = (userId: string) => BudgetModel.find({ userId }).populate('categoryId', 'name type')
export const getBudgetById = (id: string) => BudgetModel.findById(id).populate('categoryId', 'name type')
export const createBudget = (values: Record<string, any>) => new BudgetModel(values)
    .save().then((budget) => budget.toObject())
export const deleteBudgetById = (id: string) => BudgetModel.findOneAndDelete({ _id: id })
export const updateBudgetById = (id: string, values: Record<string, any>) => BudgetModel.findByIdAndUpdate(id, values, { new: true })