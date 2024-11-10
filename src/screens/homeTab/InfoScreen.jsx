import React, { useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { formattedDate } from '../../utils/Format'

const InfoScreen = ({ blockData }) => {
  const endDate = blockData.endDate

  const calculateRemainingDays = (expirationDate) => {
    const end = new Date(expirationDate)
    const remainingDays = Math.max(
      0,
      Math.ceil((end - new Date()) / (1000 * 3600 * 24)),
    )
    return remainingDays
  }

  const remainingDays = useMemo(
    () => calculateRemainingDays(endDate),
    [endDate],
  )

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>Thông tin ô đất</Text>
        <Text style={styles.text}>
          Hạn sử dụng ô đất: {formattedDate(endDate)}
        </Text>
        <Text style={styles.text}>Ngày còn lại: {remainingDays} ngày</Text>
        <TouchableOpacity
          style={styles.renewButton}
          onPress={() => alert('Gia hạn thành công!')}
        >
          <Text style={styles.renewButtonText}>Gia hạn</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
  },
  infoBox: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  renewButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  renewButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default InfoScreen
