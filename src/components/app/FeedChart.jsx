import React, { useMemo } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const FeedChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null

    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    )

    const feedIntakeValues = sortedData.map((record) => record.feedIntake || 0)
    const hasValidData = feedIntakeValues.some((value) => value > 0)

    if (!hasValidData) return null

    return {
      labels: sortedData.map((record) =>
        new Date(record.date).toLocaleDateString('vi-VN'),
      ),
      datasets: [
        {
          data: feedIntakeValues,
          color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`,
          strokeWidth: 3,
        },
      ],
      legend: ['Lượng thức ăn (gam)'],
    }
  }, [data])

  if (!chartData) {
    return (
      <View style={styles.emptyContainer}>
        <Image style={styles.emptyImage} />
        <Text style={styles.emptyText}>Không có dữ liệu thức ăn</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Biểu đồ lượng thức ăn</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={300}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f7f7f7',
          backgroundGradientTo: '#f7f7f7',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            marginVertical: 8,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#FF7F50',
          },
        }}
        bezier
        style={styles.chartStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  chartStyle: {
    marginVertical: 12,
    borderRadius: 16,
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
    tintColor: '#ccc',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
  },
})

export default FeedChart
