import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
import Response from '~/utils/Response'
import messages from '~/utils/messages'
import { asyncHandler } from '~/utils/asyncHandler'

const createNew = asyncHandler(async (req, res) => {
  await cardService.createNew(req.body)
  return Response.success(res, StatusCodes.CREATED, messages.success.card.created)
})

const updateById = asyncHandler(async (req, res) => {
  await cardService.updateById(req.params.id, req.body)
  return Response.success(res, StatusCodes.OK, messages.success.card.updated)
})

export const cardController = {
  createNew,
  updateById
}
