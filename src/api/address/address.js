import axios from 'axios'
const getAddress = async (data) => {
  return await axios.get(
    `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`,
    data,
  )
}

export { getAddress }
