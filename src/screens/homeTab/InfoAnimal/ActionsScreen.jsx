import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

const ActionsScreen = ({ route }) => {
  const { animalData } = route.params
  const sensors = animalData.sensorResponses || []

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Xem Camera')}
      >
        <Ionicons name="camera-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Xem Camera</Text>
        <Text style={styles.buttonDescription}>
          Theo dõi trực tiếp qua camera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Xem Dữ Liệu Cảm Biến')}
      >
        <Ionicons name="analytics-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Xem Dữ Liệu Cảm Biến</Text>
        <Text style={styles.buttonDescription}>
          Kiểm tra các chỉ số môi trường
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  sensorContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
})

export default ActionsScreen
