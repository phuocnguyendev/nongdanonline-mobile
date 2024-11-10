import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import InfoItem from '../../../components/app/InfoItem'
import { formatWeight, formattedDate } from '../../../utils/Format'

const InfoScreen = ({ route }) => {
  const { animalData } = route.params

  return (
    <ScrollView style={styles.container}>
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
})

export default InfoScreen
