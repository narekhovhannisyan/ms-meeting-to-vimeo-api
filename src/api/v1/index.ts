import express from 'express'

import MeetingTransferRoutes from './routes/meeting-transfer.route'

const app = express()

app.use('/meeting-transfer', MeetingTransferRoutes)

export default app
