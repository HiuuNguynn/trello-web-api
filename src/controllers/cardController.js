import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
import Response from '~/utils/Response'
import messages from '~/utils/messages'

const createNew = async (req, res) => {
  const createdCard = await cardService.createNew(req.body)
  return Response.success(res, StatusCodes.CREATED, messages.success.card.created, createdCard)
}

export const cardController = {
  createNew
}
