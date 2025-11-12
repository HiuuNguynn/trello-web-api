import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (name & schema)
const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(3).max(50).trim().strict(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(50).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const _INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async data => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async data => {
  const validData = await validateBeforeCreate(data)
  return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
}

const findOneById = async userId => {
  return await GET_DB()
    .collection(USER_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(userId) })
}

const findOneByEmail = async email => {
  return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email })
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  findOneByEmail
}
