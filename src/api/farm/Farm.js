import { instance } from '../config'

export const getFarms = async () => {
  const response = await instance.get('/farms')
  return response.data
}
