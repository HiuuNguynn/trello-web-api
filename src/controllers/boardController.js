import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import Response from '~/utils/Response'
import messages from '~/utils/messages'
import { asyncHandler } from '~/utils/asyncHandler'

const createNew = asyncHandler(async (req, res) => {
  const newBoard = await boardService.createNew({
    ...req.body,
    userId: req.jwtDecoded._id
  })
  return Response.success(res, StatusCodes.CREATED, messages.success.board.created, newBoard)
})

const update = asyncHandler(async (req, res) => {
  await boardService.update(req.params.id, req.body)
  return Response.success(res, StatusCodes.OK, messages.success.board.updated, req.body)
})

const getDetails = asyncHandler(async (req, res) => {
  const details = await boardService.getDetails(req.params.id, req.jwtDecoded._id)

  return Response.success(res, StatusCodes.OK, messages.success.board.detail, details)
})

const moveCardToDifferentColumn = asyncHandler(async (req, res) => {
  await boardService.moveCardToDifferentColumn(req.body)
  return Response.success(res, StatusCodes.OK, messages.success.board.moved_card, req.body)
})

const getAllByUserId = asyncHandler(async (req, res) => {
  const boards = await boardService.getAllByUserId(req.jwtDecoded._id)
  return Response.success(res, StatusCodes.OK, messages.success.board.list, boards)
})

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  getAllByUserId
}
