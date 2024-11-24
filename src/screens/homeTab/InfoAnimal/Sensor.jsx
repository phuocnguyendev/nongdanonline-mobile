import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Toast from 'react-native-toast-message'
import { fetchSensorData } from '../../../api/sensor/sensorService'

const screenWidth = Dimensions.get('window').width

const Sensor = ({ route }) => {
  const { sensorResponses } = route.params
  const [sensorData, setSensorData] = useState(null)
  const [selectedTab, setSelectedTab] = useState('H2S')
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState(null)

  const tabOrder = ['H2S', 'NH3', 'Nhiệt độ', 'Độ ẩm']
  const sortedSensorResponses = sensorResponses
    .map((sensor) => ({
      ...sensor,
      sensorName: sensor.sensorName.trim(),
    }))
    .sort(
      (a, b) => tabOrder.indexOf(a.sensorName) - tabOrder.indexOf(b.sensorName),
    )

  const getMidnightVietnamTime = () => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    return currentDate
  }

  const getSensorData = useCallback(async () => {
    try {
      const selectedSensor = sortedSensorResponses.find(
        (sensor) => sensor.sensorName === selectedTab,
      )

      if (!selectedSensor) {
        Toast.show({ type: 'error', text1: 'No sensor data available.' })
        setLoading(false)
        setSensorData(null)
        return
      }

      setLoading(true)
      const gmt7Midnight = getMidnightVietnamTime()
      const fromUTC = new Date(gmt7Midnight.getTime() - 7 * 60 * 60 * 1000)
      const from = fromUTC.toISOString()

      const data = await fetchSensorData(
        selectedSensor.urlLogSensorByHours,
        selectedSensor.sensorCode,
        from,
      )

      if (data && Array.isArray(data.dataLogs)) {
        setSensorData(data)
        const newChartData = getChartData(data)
        setChartData(newChartData)
      } else {
        setSensorData(null)
        setChartData(null)
      }

      setLoading(false)
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error fetching sensor data.' })
      setLoading(false)
      setSensorData(null)
      setChartData(null)
    }
  }, [selectedTab, sortedSensorResponses])

  useEffect(() => {
    getSensorData()
  }, [selectedTab]) // Trigger data fetch when selectedTab changes

  const handleTabChange = (tab) => {
    setSelectedTab(tab.trim())
  }

  const getChartData = useCallback((data) => {
    if (!data || !Array.isArray(data.dataLogs)) {
      return null
    }

    const startDate = getMidnightVietnamTime()
    const fullDayLabels = []
    const totalHours = 24
    for (let i = 0; i < totalHours; i += 3) {
      const currentHour = new Date(startDate.getTime() + i * 60 * 60 * 1000)
      const formattedDateTime = `${currentHour.getHours().toString().padStart(2, '0')}:00`
      fullDayLabels.push(formattedDateTime)
    }

    const dataMap = new Map()
    data.dataLogs.forEach((entry) => {
      const date = new Date(entry.time)
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000)
      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:00`
      dataMap.set(formattedTime, entry.data)
    })

    const chartData = fullDayLabels.map((label) => dataMap.get(label) || 0)

    return {
      labels: fullDayLabels,
      datasets: [
        {
          data: chartData,
          color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    }
  }, [])

  const memoizedChartData = useMemo(() => chartData, [chartData])

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {sortedSensorResponses.map((sensor) => (
            <TouchableOpacity
              key={sensor.sensorCode}
              onPress={() => handleTabChange(sensor.sensorName)}
              style={[
                styles.tabButton,
                selectedTab === sensor.sensorName && styles.activeTabButton,
              ]}
              disabled={loading}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === sensor.sensorName && styles.activeTabText,
                ]}
              >
                {sensor.sensorName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chartContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#009688" />
        ) : !memoizedChartData ? (
          <Text style={styles.noDataText}>
            Không có dữ liệu cảm biến. Vui lòng kiểm tra lại kết nối hoặc chọn
            cảm biến khác.
          </Text>
        ) : (
          <LineChart
            data={memoizedChartData}
            width={screenWidth - 40}
            height={300}
            chartConfig={{
              backgroundColor: '#f7f7f7',
              backgroundGradientFrom: '#f7f7f7',
              backgroundGradientTo: '#f7f7f7',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
              labelColor: () => '#333',
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#009688',
              },
            }}
            style={styles.chartStyle}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  tabWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 5,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: '#66bb6a',
    borderRadius: 6,
  },
  tabText: {
    color: '#333',
    fontSize: 13,
    textAlign: 'center',
  },
  activeTabText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  noDataText: {
    color: '#777',
    textAlign: 'center',
    paddingVertical: 20,
  },
  chartStyle: {
    borderRadius: 8,
    paddingVertical: 10,
  },
})

export default Sensor
