// ActionsScreen.js
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Camera from './Camera'

const ActionsScreen = ({ route, navigation }) => {
  const { animalData } = route.params
  const [isCameraVisible, setCameraVisible] = useState(false)
  const sensors = animalData.sensorResponses || []
  const penCode = animalData.penCode
  const developStage = animalData.developStage

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCameraVisible(true)}
        >
          <Ionicons name="camera-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Xem Camera</Text>
          <Text style={styles.buttonDescription}>
            Theo dõi trực tiếp qua camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Sensor', { sensorResponses: sensors })
          }
        >
          <Ionicons name="analytics-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Xem Dữ Liệu Cảm Biến</Text>
          <Text style={styles.buttonDescription}>
            Kiểm tra các chỉ số môi trường
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Camera
        visible={isCameraVisible}
        onClose={() => setCameraVisible(false)}
        penCode={penCode}
        developStage={developStage}
      />
    </View>
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
})

export default ActionsScreen
