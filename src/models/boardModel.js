import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const BOARD_COLLECTION_NAME = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    
    columnOrderIds: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now()),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const createNew = async (data) => {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
}
const getById = async (id) => {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
         _id: id
    })
}

export const boardModel = {
    BOARD_COLLECTION_NAME,
    boardCollectionSchema,
    createNew,
    getById,
}