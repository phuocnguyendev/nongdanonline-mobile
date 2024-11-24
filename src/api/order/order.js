import { instance } from '../config'

const getOrderHistory = async (
  userId,
  pageIndex,
  pageSize,
  orderStatus,
  startDate,
  endDate,
  orderCode,
) => {
  return await instance.get(`orders/user/${userId}`, {
    params: {
      pageIndex,
      pageSize,
      orderStatus,
      startDate,
      endDate,
      orderCode,
    },
  })
}

export { getOrderHistory }
