import express from 'express'
import { createTransaction, deleteTransactionById, getTransactions, getTransactionById, updateTransactionById } from '../db/transactions'
import { getOrCreateCategory } from '../services/categoryService'

export const getAllTransactions = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json()
        }
        const transactions = await getTransactions(userId)
        return res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.sendStatus(400)
        }
        const transaction = await getTransactionById(id)

        if (!transaction) {
            return res.sendStatus(404)
        }
        return res.status(200).json(transaction)

    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const addTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const { date, type, amount, description, categoryName, categoryId, userId } = req.body
        if (!date || !type || !amount || !description || !userId) {
            return res.sendStatus(400)
        }


        let finalCategoryId = categoryId
        if (!categoryId && categoryName) {
            const category = await getOrCreateCategory(categoryName, type, userId)
            finalCategoryId = category._id
        }
        const transaction = await createTransaction({
            date, type, amount, description, categoryId: finalCategoryId || null, userId
        })

        return res.status(201).json(transaction)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { date, type, amount, description, categoryId, categoryName, userId } = req.body

        if (!id || !userId) {
            return res.sendStatus(400)
        }
        // If categoryName is provided but categoryId is not, check if the category exists or create it
        let finalCategoryId = categoryId;
        if (categoryName && !categoryId) {
            const category = await getOrCreateCategory(categoryName, type, userId);
            finalCategoryId = category._id;
        }

        const updatedTransaction = await updateTransactionById(id, {
            date, type, amount, description, categoryId: finalCategoryId, userId,
        })
        if (!updatedTransaction) {
            return res.sendStatus(404)
        }
        return res.status(200).json(updatedTransaction)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const deleteTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.sendStatus(400)
        }
        const deletedTransaction = await deleteTransactionById(id)
        if (!deletedTransaction) {
            return res.sendStatus(404)
        }
        return res.sendStatus(204).json(deletedTransaction)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}