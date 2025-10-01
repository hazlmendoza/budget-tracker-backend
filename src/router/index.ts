import express from 'express'
import authentication from './authentication'
import users from './users'
import transactions from './transactions'
import goals from './goals'
import budgets from './budgets'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    users(router)
    transactions(router)
    goals(router)
    budgets(router)
    return router
}