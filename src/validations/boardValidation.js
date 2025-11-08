import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
    /**
     * Note: Mặc định thì ta không phải custom message ở phía BE vì để cho FE làm tự validate và custom message phía FE cho đẹp
     * CE chỉ cần validate Đảm bảo dữ liệu chuẩn xác và trả về message mặc định của thư viện là được
     * Quan trọng: việc validate dữ liệu BẮT BUỘC phải có ở BE vì đây là điểm cuối để lưu trữ dữ liệu và database
     * Trong hệ thống điều bắt buộc là phải validate dữ liệu cả ở BE lẫn FE
     */
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title is not allowed to be empty',
            'string.min': 'Title min 3 chars',
            'string.max': 'Title max 50 chars',
            'string.trim': 'Title must not have leading or trailing whitespace'
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
        type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
    })

    try {
        // false trường hợp có nhiều lỗi validation thì trả về tất cả các lỗi (video 52)
        await correctCondition.validateAsync(req.body, { abortEarly: false})
        // validate dữ liệu hợp lệ thì cho requeset đi tiếp đến Controller
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}

export const boardValidation = {
    createNew
}