import { instance } from '../config'

export const getFarms = async () => {
  const response = await instance.get('/farms')
  return response.data?.data || []
}
export const getFarmDetails = async (farmID) => {
  try {
    const response = await instance.get(`/farms/${farmID}/details`)
    return response.data?.data || {}
  } catch (error) {
    console.error('Error fetching farm details:', error)
    return {}
  }
}
export const getBlocksByFarm = async (farmID, pageIndex = 1, pageSize = 5) => {
  const response = await instance.get(`/block-owner-users/${farmID}`, {
    params: { pageIndex, pageSize },
  })
  return response.data.data
}

export const getMyPackages = async () => {
  const response = await instance.get('/my-packages')
  return response.data.data || []
}
export const getFarmAnimal = async (farmId, animalTypeId) => {
  try {
    const url = `/animals/farm-animals?farmId=${farmId}&animalTypeId=${animalTypeId}`
    const response = await instance.get(url)

    if (response?.data?.data) {
      return response.data.data
    } else {
      console.warn('API returned unexpected structure:', response)
      return []
    }
  } catch (error) {
    console.error('Error fetching animals:', error)
    return []
  }
}
export const getAnimalPackage = async (animalId) => {
  try {
    const response = await instance.get(
      `/my-packages/animal?animalId=${animalId}`,
    )
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching packages for animal:', error)
    return []
  }
}

export const addAnimalToFarm = async (data) => {
  try {
    const formattedData = {
      blockOwnerUserID: data.blockOwnerUserID,
      animalId: data.animalId,
      animalName: data.animalName,
      myPackageId: data.myPackageId,
    }

    const response = await instance.post('/animal-owner-users', formattedData)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error adding animal to farm:', error.response.data)
    } else {
      console.error('Error adding animal to farm:', error)
    }
    throw error
  }
}
export const addPackage = async (data) => {
  try {
    const response = await instance.patch('/user-animal-owner-care', data)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error adding package:', error.response.data)
    } else {
      console.error('Error adding package:', error)
    }
    throw error
  }
}
export const getAnimalDetails = async (animalOwnerUserId) => {
  try {
    const response = await instance.get(
      `/block-owner-users/details/${animalOwnerUserId}`,
    )
    return response.data?.data || {}
  } catch (error) {
    console.error('Error fetching animal details:', error)
    return {}
  }
}
export const myFarm = async (data) => {
  return await instance.get(`/block-owner-users/my-farm`, data)
}

export const getAnimalHistory = (userId) => {
  return instance.get(`animal-owner-users/get-histories?userId=${userId}`)
}

export const getAnimalHistoryHealth = async (
  animalOwnerUserId,
  specificDate = null,
  startDate = null,
  endDate = null,
) => {
  try {
    const params = {}

    if (specificDate) {
      params.specificDate = specificDate
    }
    if (startDate) {
      params.startDate = startDate
    }
    if (endDate) {
      params.endDate = endDate
    }

    const response = await instance.get(
      `/animal-raising-history/${animalOwnerUserId}`,
      {
        params,
      },
    )
    return response
  } catch (error) {
    throw error
  }
}
