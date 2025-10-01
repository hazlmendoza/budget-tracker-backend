import express from 'express'
import { createGoal, getGoals, getGoalById, updateGoalById, deleteGoalById } from '../db/goals'

export const getAllGoals = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params 
        const goals = await getGoals(userId)
        return res.status(200).json(goals)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const getGoal = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const goal = await getGoalById(id)
        if (!goal) {
            return res.status(404).json() 
        }
        return res.status(200).json(goal) 
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}
export const addGoal = async (req: express.Request, res: express.Response) => {
    try {
        const { title, targetAmount, currentAmount, startDate, dueDate, userId } = req.body
        if (!title || !targetAmount || !startDate || !dueDate || !userId) {
            return res.status(400).json() 
        }
        const goal = await createGoal({ title, targetAmount, currentAmount: currentAmount || 0, startDate, dueDate, userId })
        return res.status(201).json(goal) 
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const updateGoal = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params 
        const { title, targetAmount, currentAmount, startDate, dueDate, userId } = req.body
        const updatedGoal = await updateGoalById(id, { title, targetAmount, currentAmount, startDate, dueDate, userId })
        if (!updatedGoal) {
            return res.status(404).json()
        }
        return res.status(200).json(updatedGoal)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const deleteGoal = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedGoal = await deleteGoalById(id)
        if (!deletedGoal) {
            return res.status(404).json()
        }
        return res.sendStatus(204)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}