import express from 'express'
import { isAuthenticated } from '../middlewares'
import { addTransaction, deleteTransaction, getTransaction, getAllTransactions, updateTransaction } from '../controllers/transactions'

export default (router: express.Router) => {
    router.post('/transactions', addTransaction)
    router.get('/transactions/:userId', getAllTransactions)
    router.get('/transactions/:id', isAuthenticated, getTransaction)
    router.patch('/transactions/:id', updateTransaction)
    router.delete('/transactions/:id', deleteTransaction)
}