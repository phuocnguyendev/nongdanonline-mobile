import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Video } from 'expo-av'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { fetchCameraData } from '../../../api/sensor/sensorService'

const Camera = ({ visible, onClose, penCode, developStage }) => {
  const [cameraData, setCameraData] = useState(null)
  const [cameraUrl, setCameraUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCameraData(penCode)
        const url = `${process.env.VITE_API_URL}${data}`
        setCameraData(data)
        setCameraUrl(url)
      } catch (error) {
        console.error('Error fetching camera data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (penCode && visible) {
      fetchData()
    }
  }, [penCode, visible])

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-circle" size={32} color="#FF3333" />
          </TouchableOpacity>
          <Text style={styles.title}>Camera Giám Sát</Text>
          <View style={styles.stageContainer}>
            <Text style={styles.stageText}>Giai Đoạn</Text>
            <View style={styles.stageBadge}>
              <MaterialCommunityIcons
                name="egg"
                size={18}
                color="#FFA500"
                style={styles.icon}
              />
              <Text style={styles.stageLabel}>{developStage}</Text>
            </View>
          </View>
          <View style={styles.videoContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Video
                source={{ uri: cameraUrl }}
                useNativeControls
                resizeMode="contain"
                style={styles.video}
                onError={(e) => console.error('Video Error:', e)}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '20%', // Di chuyển modal xuống một chút
    position: 'relative', // Giữ nút đóng trong modal
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stageText: {
    fontSize: 16,
    fontWeight: '600',
  },
  stageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0B2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  stageLabel: {
    color: '#FFA500',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})

export default Camera
