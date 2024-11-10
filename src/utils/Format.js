export const formatVND = (number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number)
}

export const formattedDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${day}-${month}-${year}`
}

export const formatWeight = (number) => {
  if (isNaN(number)) return 'Không hợp lệ'
  return (number / 1000).toFixed(2) + ' Kg'
}
