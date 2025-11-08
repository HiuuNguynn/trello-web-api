import { slugify } from "~/utils/formatter"
import { boardModel } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import { StatusCodes } from "http-status-codes"
import { cloneDeep } from "lodash"

const createNew = async (reqBody) => {
    try {
    const newBoard = {
        ...reqBody,
        slug: slugify(reqBody.title),
    }
        const createBoard =  await boardModel.createNew(newBoard)
        const getNewBoard = await boardModel.getDetails(createBoard.insertedId)

        return getNewBoard
    }
    catch (error) {
        throw new Error(error)
    }
}

const getDetails = async (boardId) => {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
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
}
