import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt', 'boardId']

const validateBeforeCreate = async data => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const findOneById = async columnId => {
  return await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(columnId) })
}

const pushCardOrderIds = async card => {
  return await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .findOneAndUpdate(
      {
        _id: new ObjectId(card.columnId),
        _destroy: false
      },
      {
        $push: { cardOrderIds: new ObjectId(card._id) }
      },
      {
        returnDocument: 'after'
      }
    )
}

const createNew = async data => {
  const validData = await validateBeforeCreate(data)
  return await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .insertOne({
      ...validData,
      boardId: new ObjectId(validData.boardId)
    })
}

const update = async (columnId, updateData) => {
  Object.keys(updateData).forEach(fieldName => {
    if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete updateData[fieldName]
    }
  })
  return await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(columnId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
}

const deleteItem = async columnId => {
  return await GET_DB()
    .collection(COLUMN_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(columnId) })
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  pushCardOrderIds,
  update,
  deleteItem
}
