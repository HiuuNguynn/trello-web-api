import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import Response from '~/utils/Response'
import messages from '~/utils/messages'

const createNew = async (req, res) => {
  await boardService.createNew(req.body)
  return Response.success(res, StatusCodes.CREATED, messages.success.board.created)
}

const update = async (req, res) => {
  await boardService.update(req.params.id, req.body)
  return Response.success(res, StatusCodes.OK, messages.success.board.updated)
}

const getDetails = async (req, res) => {
  const details = await boardService.getDetails(req.params.id)
  return Response.success(res, StatusCodes.OK, messages.success.board.detail, details)
}

const moveCardToDifferentColumn = async (req, res) => {
  await boardService.moveCardToDifferentColumn(req.body)
  return Response.success(res, StatusCodes.OK, messages.success.board.moved_card)
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
