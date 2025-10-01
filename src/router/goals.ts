import express from 'express'
import { isAuthenticated } from '../middlewares'
import { addGoal, deleteGoal, getAllGoals, getGoal, updateGoal } from '../controllers/goals'

export default (router: express.Router) => {
    router.post('/goals', addGoal)
    router.get('/goals/:userId', getAllGoals)
    router.get('/goals/:id', getGoal)
    router.patch('/goals/:id', updateGoal)
    router.delete('/goals/:id', deleteGoal)
}