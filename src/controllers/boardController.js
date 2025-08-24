import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
    try {
        return res.status(StatusCodes.CREATED).json({
            message: 'Board controller is working'
        })
    } catch (error) {
        next(error)
    }
}

export const boardController = {
    createNew
}