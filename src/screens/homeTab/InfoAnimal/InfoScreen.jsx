import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import InfoItem from '../../../components/app/InfoItem'
import { formatWeight, formattedDate } from '../../../utils/Format'

const InfoScreen = ({ route }) => {
  const { animalData } = route.params
  const navigation = useNavigation()

  const handleViewHealthRecord = () => {
    navigation.navigate('AnimalHealth', {
      animalOwnerId: animalData.animalOwnerUserId,
    }) // Ensure the AnimalHealth screen is properly set up in navigation
  }

  return (
    <ScrollView style={styles.container}>
      {/* Health Record Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.healthButton}
          onPress={handleViewHealthRecord}
        >
          <Text style={styles.healthButtonText}>Sổ Sức Khỏe</Text>
        </TouchableOpacity>
      </View>

      {/* Animal Info */}
      <View style={styles.rowContainer}>
        <InfoItem
          iconName="paw"
          label="Tên động vật"
          value={animalData.animalName}
        />
        <InfoItem
          iconName="calendar"
          label="Số ngày nuôi"
          value={`${animalData.age} ngày`}
        />
      </View>

      <View style={styles.rowContainer}>
        <InfoItem
          iconName="calendar-sharp"
          label="Ngày bắt đầu"
          value={formattedDate(animalData.startDate)}
        />
        <InfoItem
          iconName="calendar-outline"
          label="Ngày kết thúc dự kiến"
          value={formattedDate(animalData.endDate)}
        />
      </View>

      <View style={styles.rowContainer}>
        <InfoItem
          iconName="fitness-outline"
          label="Cân nặng"
          value={formatWeight(animalData.weight)}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 20, // Add spacing below the button
    alignItems: 'center',
    marginLeft: 215,
  },
  healthButton: {
    backgroundColor: '#00A86B', // Emerald green
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  healthButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default InfoScreen
