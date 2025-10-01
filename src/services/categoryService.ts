import { CategoryModel } from '../db/categories'

// Get an existing category or create a new one if it doesn't exist
export const getOrCreateCategory = async (
  name: string,
  type: 'Income' | 'Expense',
  userId: string
) => {
  let category = await CategoryModel.findOne({ name, type, userId })
  if (!category) {
    category = await CategoryModel.create({ name, type, userId })
  }
  return category
}

