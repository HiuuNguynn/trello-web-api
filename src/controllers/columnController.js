import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'
import Response from '~/utils/Response'
import messages from '~/utils/messages'
import { asyncHandler } from '~/utils/asyncHandler'

const createNew = asyncHandler(async (req, res) => {
  await columnService.createNew(req.body)
  return Response.success(res, StatusCodes.CREATED, messages.success.column.created)
})

const update = asyncHandler(async (req, res) => {
  await columnService.update(req.params.id, req.body)
  return Response.success(res, StatusCodes.OK, messages.success.column.updated)
})

const deleteItem = asyncHandler(async (req, res) => {
  await columnService.deleteItem(req.params.id)
  return Response.success(res, StatusCodes.OK, messages.success.column.deleted)
})

export const columnController = {
  createNew,
  update,
  deleteItem
}
