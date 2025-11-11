import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import messages from '~/utils/messages'
import { isEmpty } from 'lodash'

const createNew = async dataInput => {
  await boardModel.createNew({
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

const getDetails = async boardId => {
  const board = await boardModel.getDetails(boardId)
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

export const boardService = {
  createNew,
  getDetails,
  update
}
