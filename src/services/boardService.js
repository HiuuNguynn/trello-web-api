import { slugify } from "~/utils/formatter"
const createNew = async (reqBody) => {
    try {
    const newBoard = {
        ...reqBody,
        slug: slugify(reqBody.title),
    }
        return newBoard
    }
    catch (error) {
        throw new Error(error)
    }
}

export const boardService = { createNew }