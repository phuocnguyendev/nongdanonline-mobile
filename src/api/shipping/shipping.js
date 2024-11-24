import { instance } from '../config'

const getShippingHistory = async (
  userId,
  pageIndex,
  pageSize,
  shippingStatus,
  farmID,
  shippingCode,
  shippingDate,
) => {
  return await instance.get(`shipping/user/${userId}`, {
    params: {
      pageIndex,
      pageSize,
      shippingStatus,
      farmID,
      shippingCode,
      shippingDate,
    },
  })
}

export { getShippingHistory }
