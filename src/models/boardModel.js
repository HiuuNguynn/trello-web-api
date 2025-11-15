import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
  userId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async data => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async data => {
  const validData = await validateBeforeCreate(data)
  return await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .insertOne({
      ...validData,
      userId: new ObjectId(validData.userId)
    })
}

const update = async (boardId, updateData) => {
  Object.keys(updateData).forEach(fieldName => {
    if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete updateData[fieldName]
    }
  })
  return await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
}

// Query using aggregate
const getDetails = async (boardId, userId) => {
  const result = await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .aggregate([
      {
        $match: {
          _id: new ObjectId(boardId),
          userId: new ObjectId(userId),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: columnModel.COLUMN_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: cardModel.CARD_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      }
    ])
    .toArray()
  return result[0] || {}
}

const pushColumnOrderIds = async column => {
  try {
    return await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(column.boardId),
          _destroy: false
        },
        {
          $push: { columnOrderIds: new ObjectId(column._id) }
        },
        {
          returnDocument: 'after'
        }
      )
  } catch (error) {
    throw new Error(error)
  }
}

const deleteColumnOrderIds = async column => {
  return await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .findOneAndUpdate(
      {
        _id: new ObjectId(column.boardId),
        _destroy: false
      },
      {
        $pull: { columnOrderIds: new ObjectId(column._id) }
      },
      {
        returnDocument: 'after'
      }
    )
}

const getAllByUserId = async userId => {
  return await GET_DB()
    .collection(BOARD_COLLECTION_NAME)
    .find({
      userId: new ObjectId(userId),
      _destroy: false
    })
    .sort({ createdAt: -1 })
    .toArray()
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  getDetails,
  pushColumnOrderIds,
  deleteColumnOrderIds,
  update,
  getAllByUserId
}
