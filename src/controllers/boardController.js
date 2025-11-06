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

const getDetails = async (req, res, next) => {
    try {
        const boadId = req.params.id
        const board = await boardService.getDetails(boadId)
        return res.status(StatusCodes.OK).json(board)
    } catch (error) {
        next(error)
    }
}

export const boardController = {
    createNew,
    getDetails,
}
