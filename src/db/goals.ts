import mongoose from 'mongoose'

const GoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, required: { default: 0 } },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export const GoalModel = mongoose.model('Goal', GoalSchema)

export const getGoals = (userId: string) => GoalModel.find({ userId })
export const getGoalById = (id: string) => GoalModel.findById(id)
export const createGoal = (values: Record<string, any>) => new GoalModel(values)
    .save().then((goal) => goal.toObject())
export const deleteGoalById = (id: string) => GoalModel.findOneAndDelete({ _id: id })
export const updateGoalById = (id: string, values: Record<string, any>) => GoalModel.findByIdAndUpdate(id, values, { new: true })