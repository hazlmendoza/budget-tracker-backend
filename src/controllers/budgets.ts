import express from 'express'
import { createBudget, getBudgets, getBudgetById, updateBudgetById, deleteBudgetById } from '../db/budgets'
import { getOrCreateCategory } from '../services/categoryService'

export const getAllBudgets = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params
        const budgets = await getBudgets(userId)
        return res.status(200).json(budgets)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const getBudget = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const budget = await getBudgetById(id)
        if (!budget) {
            return res.status(404).json()
        }
        return res.status(200).json(budget)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const addBudget = async (req: express.Request, res: express.Response) => {
    try {
        const { categoryId, categoryName, categoryType, amount, spent, startDate, endDate, userId } = req.body;
        if (!amount || !startDate || !endDate || !userId) {
            return res.status(400).json();
        }

        let finalCategoryId = categoryId;

        // Get an existing category or create a new one if it doesn't exist
        if (!categoryId && categoryName) {
            const category = await getOrCreateCategory(categoryName, categoryType, userId);
            finalCategoryId = category._id;
        }
        const budget = await createBudget({
            categoryName: categoryName, amount, spent: spent || 0, startDate, endDate, categoryId: finalCategoryId, userId
        });
        return res.status(201).json(budget);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

export const updateBudget = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { category, amount, spent, startDate, endDate, categoryId, userId } = req.body

        const updatedBudget = await updateBudgetById(id, { category, amount, spent, startDate, endDate, categoryId, userId })
        if (!updatedBudget) {
            return res.status(404).json()
        }
        return res.status(200).json(updatedBudget)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const deleteBudget = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedBudget = await deleteBudgetById(id)
        if (!deletedBudget) {
            return res.status(404).json()
        }
        return res.sendStatus(204)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}