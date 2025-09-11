import Joi from 'joi'

const BOARD_COLLECTION_NAME = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    
    columnOrderIds: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now()),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().timestamp('javascript').default(false)
})

export const boardModel = {
    BOARD_COLLECTION_NAME,
    boardCollectionSchema,
}