import { FontAwesome5 } from '@expo/vector-icons' // Import icons from Expo
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HealthStats = ({ data }) => {
  const latestRecord = data[0] || {}

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông Tin Mới Nhất</Text>

      <View style={styles.stat}>
        <FontAwesome5
          name="weight"
          size={24}
          color="#3498DB"
          style={styles.icon}
        />
        <View>
          <Text style={styles.label}>Cân nặng</Text>
          <Text style={styles.value}>
            {isNaN(latestRecord.weight) || latestRecord.weight == null
              ? 0
              : (latestRecord.weight / 1000).toFixed(2)}{' '}
            kg
          </Text>
        </View>
      </View>

      <View style={styles.stat}>
        <FontAwesome5
          name="utensils"
          size={24}
          color="#2ECC71"
          style={styles.icon}
        />
        <View>
          <Text style={styles.label}>Lượng thức ăn</Text>
          <Text style={styles.value}>
            {latestRecord.feedIntake && !isNaN(latestRecord.feedIntake)
              ? latestRecord.feedIntake.toFixed(2)
              : 'Chưa có thức ăn'}
            /ngày
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2C3E50',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
  },
})

export default HealthStats
