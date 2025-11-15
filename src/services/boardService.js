import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { isEmpty } from 'lodash'
import messages from '~/utils/messages'
import ApiError from '~/utils/ApiError'

const createNew = async dataInput => {
  return await boardModel.createNew({
    ...dataInput,
    slug: slugify(dataInput.title)
  })
}

const update = async (boardId, reqBody) => {
  await boardModel.update(boardId, {
    ...reqBody,
    updatedAt: Date.now()
  })
}

const getDetails = async (boardId, userId) => {
  const board = await boardModel.getDetails(boardId, userId)
  if (isEmpty(board)) {
    throw new ApiError(StatusCodes.NOT_FOUND, messages.error.board.not_found)
  }

  // Deep Clone board ra một cái mới để xử lý, không ảnh hưởng tới board ban đầu, tùy mục đích về sau mà có cần clone deep hay không
  const resBoard = cloneDeep(board)
  resBoard.columns.forEach(column => {
    column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
  })

  delete resBoard.cards

  return resBoard
}

const moveCardToDifferentColumn = async dataInput => {
  await columnModel.update(dataInput.prevColumnId, {
    cardOrderIds: dataInput.prevCardOrderIds,
    updatedAt: Date.now()
  })

  await columnModel.update(dataInput.nextColumnId, {
    cardOrderIds: dataInput.nextCardOrderIds,
    updatedAt: Date.now()
  })

  await cardModel.update(dataInput.currentCardId, {
    columnId: dataInput.nextColumnId
  })
}

const getAllByUserId = async userId => {
  return await boardModel.getAllByUserId(userId)
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  getAllByUserId
}
