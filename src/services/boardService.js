import { slugify } from "~/utils/formatter"
import { boardModel } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import { StatusCodes } from "http-status-codes"

const createNew = async (reqBody) => {
    try {
    const newBoard = {
        ...reqBody,
        slug: slugify(reqBody.title),
    }
        const createBoard =  await boardModel.createNew(newBoard)
        console.log(createBoard)
        const getNewBoard = await boardModel.getDetails(createBoard.insertedId)
        console.log(getNewBoard)

        return getNewBoard
    }
    catch (error) {
        throw new Error(error)
    }
}

const getDetails = async (boadId) => {
    const board = await boardModel.getDetails(boadId)
    if (!board) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    return board
}

export const boardService = {
    createNew,
    getDetails,
}
