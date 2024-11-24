import { VITE_API_SECRETKEY, VITE_API_URL } from '@env'
import axios from 'axios'
import CryptoJS from 'crypto-js'

const generateSignature = (secretKey, data) => {
  const signature = CryptoJS.HmacSHA256(data, secretKey)
  return CryptoJS.enc.Base64.stringify(signature)
}

const computeContentHash = (content) => {
  const hash = CryptoJS.SHA256(content)
  return CryptoJS.enc.Base64.stringify(hash)
}

const fetchSensorData = async (url, sensorCode, from, to) => {
  try {
    const timestamp = new Date().toUTCString()
    const contentHash = computeContentHash('')
    const dataToSign = `${timestamp}\n${contentHash}`
    const signature = generateSignature(VITE_API_SECRETKEY, dataToSign)

    const headers = {
      'x-ms-date': timestamp,
      'x-ms-content-sha256': contentHash,
      Authorization: `Hmac ${signature}`,
    }

    const response = await axios.get(url, {
      headers,
      params: {
        sensorCode,
        from,
        to,
      },
    })

    return response.data
  } catch (error) {
    console.error(
      'Error fetching sensor data:',
      error.response?.data || error.message,
    )
    throw error
  }
}

const fetchCameraData = async (penCode) => {
  try {
    const url = `${VITE_API_URL}/api/streams/pens/${penCode}`
    const timestamp = new Date().toUTCString()
    const contentHash = computeContentHash('')
    const dataToSign = `${timestamp}\n${contentHash}`
    const signature = generateSignature(VITE_API_SECRETKEY, dataToSign)

    const headers = {
      'x-ms-date': timestamp,
      'x-ms-content-sha256': contentHash,
      Authorization: `Hmac ${signature}`,
    }

    const response = await axios.get(url, { headers })

    return response.data
  } catch (error) {
    console.error(
      'Error fetching camera data:',
      error.response?.data || error.message,
    )
    throw error
  }
}

export { fetchCameraData, fetchSensorData }
