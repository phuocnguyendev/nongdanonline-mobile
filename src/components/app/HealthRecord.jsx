import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { getAnimalHistoryHealth } from '../../api/farm/Farm'
import FeedChart from './FeedChart'
import HealthCalendar from './HealthCalendar'
import HealthStats from './HealthStats'
import HealthTable from './HealthTable'
import WeightChart from './WeightChart'

const HealthRecord = ({ animalOwnerUserId }) => {
  const [healthData, setHealthData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  })
  const [filteredData, setFilteredData] = useState(null)
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const fetchHealthData = async (filters = {}) => {
    setLoading(true)
    try {
      const response = await getAnimalHistoryHealth(
        animalOwnerUserId,
        filters.specificDate,
        filters.startDate,
        filters.endDate,
      )
      if (response && response.data) {
        console.log('API Response Data:', response.data)
        const sortedData = [...response.data.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        )
        setHealthData(sortedData)
        setFilteredData(sortedData[0] || null)
      } else {
        console.warn('No data in API response')
        setHealthData([])
        setFilteredData(null)
      }
    } catch (error) {
      console.error('Error fetching health data:', error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Không thể tải dữ liệu sức khỏe',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealthData()
  }, [animalOwnerUserId])

  const handleDateRangeChange = (start, end) => {
    setDateRange({ startDate: start, endDate: end })
    fetchHealthData({
      startDate: start ? start.toISOString().split('T')[0] : null,
      endDate: end ? end.toISOString().split('T')[0] : null,
    })
  }

  const handleSpecificDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setSelectedDate(selectedDate)
      fetchHealthData({
        specificDate: selectedDate.toISOString().split('T')[0],
      })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sổ Sức Khỏe Vật Nuôi</Text>

      <View style={styles.filters}>
        <View>
          <Text style={styles.label}>Chọn khoảng thời gian</Text>
          <View style={styles.datePickerContainer}>
            <Text
              style={styles.datePickerButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              {dateRange.startDate
                ? dateRange.startDate.toDateString()
                : 'Ngày bắt đầu'}
            </Text>
            <Text> - </Text>
            <Text
              style={styles.datePickerButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              {dateRange.endDate
                ? dateRange.endDate.toDateString()
                : 'Ngày kết thúc'}
            </Text>
          </View>
        </View>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={dateRange.startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false)
            handleDateRangeChange(selectedDate, dateRange.endDate)
          }}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={dateRange.endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false)
            handleDateRangeChange(dateRange.startDate, selectedDate)
          }}
        />
      )}

      {/* Layout */}
      <View style={styles.grid}>
        {/* Calendar and Stats */}
        <View style={styles.leftColumn}>
          <HealthCalendar
            selectedDate={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
            healthData={healthData}
          />
          <HealthStats data={filteredData ? [filteredData] : []} />
        </View>

        {/* Charts and Table */}
        <View style={styles.rightColumn}>
          <WeightChart data={healthData} />
          <FeedChart data={healthData} />
          <HealthTable data={healthData} />
        </View>
      </View>

      {/* Toast Notifications */}
      <Toast />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FB',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filters: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerButton: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    textAlign: 'center',
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '100%',
    marginBottom: 16,
  },
  rightColumn: {
    width: '100%',
  },
})

export default HealthRecord
