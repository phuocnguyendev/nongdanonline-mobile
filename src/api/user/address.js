import { instance } from '../config'

export const postAddress = async (data) => {
  const response = await instance.post('/user-address', data)
  return response.data
}
