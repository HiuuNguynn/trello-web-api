import { slugify } from "~/utils/formatter"
import { boardModel } from "~/models/boardModel"

const createNew = async (reqBody) => {
    try {
    const newBoard = {
        ...reqBody,
        slug: slugify(reqBody.title),
    }
        const createBoard =  await boardModel.createNew(newBoard)
        console.log(createBoard)
        const getNewBoard = await boardModel.getById(createBoard.insertedId)
        console.log(getNewBoard)

        return getNewBoard
    }
    catch (error) {
        throw new Error(error)
    }
}

export const boardService = {
    createNew,
}