import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import InfoScreen from '../../screens/homeTab/InfoScreen'

function MyFarmItem(props) {
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const { hasAnimal, title, image, blockData, farmID, animalID, navigation } =
    props

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="information-circle" size={24} color="#007aff" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle" size={28} color="#555" />
            </TouchableOpacity>
            <InfoScreen blockData={blockData} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          if (hasAnimal) {
            navigation?.navigate('AddPackageScreen', { animalID, blockData })
          } else {
            navigation?.navigate('AddAnimalScreen', { blockData, farmID })
          }
        }}
      >
        <Ionicons
          name={hasAnimal ? 'gift-outline' : 'add-circle-outline'}
          size={24}
          color="#007aff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (hasAnimal) {
            navigation?.navigate('MainImageScreen', {
              title,
              blockData,
              animalID,
            })
          } else {
            navigation?.navigate('AddAnimalScreen', { blockData, farmID })
          }
        }}
      >
        <View style={styles.imageContainer}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#00a86b"
              style={styles.image}
            />
          )}
          <Image
            source={image ? { uri: image } : null}
            style={styles.image}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MyFarmItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 25,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 5,
    padding: 15,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  plusButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative', // To position the close button
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})
