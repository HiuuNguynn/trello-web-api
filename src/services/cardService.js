import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async dataInput => {
  const createCard = await cardModel.createNew({
    ...dataInput
  })
  const getNewCard = await cardModel.findOneById(createCard.insertedId)

  if (getNewCard) {
    await columnModel.pushCardOrderIds(getNewCard)
  }

  return getNewCard
}

const updateById = async (cardId, dataInput) => {
  await cardModel.update(cardId, dataInput)
}

export const cardService = {
  createNew,
  updateById
}
