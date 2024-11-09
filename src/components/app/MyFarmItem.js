import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

function MyFarmItem(props) {
  const [loading, setLoading] = useState(true)
  const { hasAnimal, title, image, farmCode, navigation, blockData, farmID } =
    props

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => navigation?.navigate('InfoScreen', { title })}
      >
        <Ionicons name="information-circle" size={24} color="#007aff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          if (hasAnimal) {
            navigation?.navigate('AddPackageScreen', { blockData, farmID })
          } else {
            navigation?.navigate('AddAnimalScreen', { blockData, farmID })
          }
        }}
      >
        {hasAnimal ? (
          <Ionicons name="gift-outline" size={24} color="#007aff" />
        ) : (
          <Ionicons name="add-circle-outline" size={24} color="#007aff" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation?.navigate('MainImageScreen', { title })}
      >
        <View style={styles.imageContainer}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#00a86b"
              style={[
                styles.image,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            />
          )}
          <Image
            source={image ? { uri: image } : ''}
            style={styles.image}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.detailContainer}></View>
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
  noImageText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 80,
  },
  infoContainer: {
    flex: 1,
    marginVertical: 10,
  },
  info: {
    fontSize: 15,
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
  addPackageText: {
    color: '#007aff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})
