import { Router } from 'express'

import * as MeetingTransferService from '../services/meeting-transfer.service'

const router = Router()

router.get('/',
  MeetingTransferService.executeStrategy
)

export default router
