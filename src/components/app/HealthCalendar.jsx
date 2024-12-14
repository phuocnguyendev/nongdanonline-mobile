import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

const HealthCalendar = ({ selectedDate, onDateChange, healthData }) => {
  const markedDates = healthData.reduce((acc, record) => {
    const date = new Date(record.date).toISOString().split('T')[0]
    acc[date] = { marked: true, dotColor: 'green' }
    return acc
  }, {})

  if (selectedDate) {
    const formattedDate = selectedDate.toISOString().split('T')[0]
    markedDates[formattedDate] = {
      ...(markedDates[formattedDate] || {}),
      selected: true,
      selectedColor: 'blue',
    }
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => onDateChange(new Date(day.dateString))}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'red',
          arrowColor: 'blue',
          dotColor: 'green',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
})

export default HealthCalendar
