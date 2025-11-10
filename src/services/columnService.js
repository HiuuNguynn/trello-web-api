import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async reqBody => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createColumn.insertedId)

    if (getNewColumn) {
      getNewColumn.cards = []
    }

    await boardModel.pushColumnOrderIds(getNewColumn)

    return getNewColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    return await columnModel.update(columnId, updateData)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteItem = async columnId => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) {
      return { deleteResult: 'Column already deleted or not found!' }
    }

    await cardModel.deleteMany(columnId)

    await boardModel.deleteColumnOrderIds(targetColumn)

    const deleteResult = await columnModel.deleteItem(columnId)

    if (deleteResult.deletedCount === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found or already deleted!')
    }

    return { deleteResult: 'Column and its Cards deleted successfully!' }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error(error)
  }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}
