import express from 'express'

import HealthRoutes from './routes/health.route'

const app = express()

app.use('/', HealthRoutes)

export default app
