import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { GET_CLIENT } from '~/config/mongodb'

const createNew = async dataInput => {
  const createColumn = await columnModel.createNew({
    ...dataInput
  })

  const getNewColumn = await columnModel.findOneById(createColumn.insertedId)

  if (getNewColumn) {
    getNewColumn.cards = []
  }

  await boardModel.pushColumnOrderIds(getNewColumn)

  return getNewColumn
}

const update = async (columnId, dataInput) => {
  return await columnModel.update(columnId, {
    ...dataInput,
    updatedAt: Date.now()
  })
}

const deleteItem = async columnId => {
  const targetColumn = await columnModel.findOneById(columnId)

  if (!targetColumn || !targetColumn.boardId) {
    return { deleteResult: 'Column already deleted or not found!' }
  }

  const session = GET_CLIENT().startSession()
  try {
    await session.withTransaction(async () => {
      await cardModel.deleteMany(columnId)
      await boardModel.deleteColumnOrderIds(targetColumn)
      await columnModel.deleteItem(columnId)
    })
  } catch (error) {
    session.abortTransaction()
    throw new Error(error)
  } finally {
    await session.endSession()
  }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}
