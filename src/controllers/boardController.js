import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
    try {
        const createdBoard = await boardService.createNew(req.body)
        res.status(StatusCodes.OK).json(createdBoard)
    } catch (error) {
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const boards = await boardService.getAll()
        res.status(StatusCodes.OK).json(boards)
    } catch (error) {
        next(error)
    }
}
export const boardController = {
    createNew,
    getAll,
}