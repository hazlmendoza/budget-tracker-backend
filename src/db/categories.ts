import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
})

export const CategoryModel = mongoose.model('Category', CategorySchema)

export const getCategories = () => CategoryModel.find()
export const getCategoryById = (id: string) => CategoryModel.findById(id)
export const createCategory = (values: Record<string, any>) => new CategoryModel(values)
    .save().then((category) => category.toObject())
export const deleteCategoryById = (id: string) => CategoryModel.findOneAndDelete({ _id: id })
export const updateCategoryById = (id: string, values: Record<string, any>) => CategoryModel.findByIdAndUpdate(id, values, { new: true })