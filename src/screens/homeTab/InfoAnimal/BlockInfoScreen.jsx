import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import InfoItem from '../../../components/app/InfoItem'
import { formattedDate, formatVND } from '../../../utils/Format'
const BlockInfoScreen = ({ route }) => {
  const { animalData } = route.params
  const blockInfo = animalData.blockOwnerUser || {}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rowContainer}>
        <InfoItem
          iconName="home-outline"
          label="Mã ô đất"
          value={blockInfo.blockUserCode}
        />
        <InfoItem
          iconName="pricetag"
          label="Giá thuê ô đất"
          value={formatVND(blockInfo.blockPrice)}
        />
      </View>

      <View style={styles.rowContainer}>
        <InfoItem
          iconName="checkmark-circle-outline"
          label="Trạng thái"
          value={blockInfo.status ? 'Có sẵn' : 'Không có sẵn'}
        />
        <InfoItem
          iconName="calendar-sharp"
          label="Ngày bắt đầu"
          value={formattedDate(blockInfo.startDate)}
        />
      </View>

      <View style={styles.rowContainer}>
        <InfoItem
          iconName="calendar-outline"
          label="Ngày kết thúc"
          value={formattedDate(blockInfo.endDate)}
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
    flexWrap: 'wrap',
    marginBottom: 16,
  },
})

export default BlockInfoScreen
