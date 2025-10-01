import express from 'express'
import { isAuthenticated } from '../middlewares'
import { addBudget, deleteBudget, getAllBudgets, getBudget, updateBudget } from '../controllers/budgets'

export default (router: express.Router) => {
    router.post('/budgets', addBudget)
    router.get('/budgets/:userId', getAllBudgets)
    router.get('/budgets/:id', getBudget)
    router.patch('/budgets/:id', updateBudget)
    router.delete('/budgets/:id',  deleteBudget)
}