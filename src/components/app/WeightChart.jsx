import React, { useMemo } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const WeightChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null

    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    )

    const labels = sortedData.map((record) =>
      new Date(record.date).toLocaleDateString('vi-VN'),
    )

    const weights = sortedData.map((record) =>
      record.weight ? (record.weight / 1000).toFixed(2) : 0,
    )

    return {
      labels,
      datasets: [
        {
          data: weights.map((weight) => parseFloat(weight)),
          color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Cân nặng (kg)'],
    }
  }, [data])

  if (!chartData) {
    return (
      <View style={styles.emptyContainer}>
        <Image style={styles.emptyImage} />
        <Text style={styles.emptyText}>Không có dữ liệu cân nặng</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biểu đồ tăng trưởng</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 90}
        height={260}
        verticalLabelRotation={30}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 12,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#00A86B',
          },
          propsForBackgroundLines: {
            strokeDasharray: '',
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
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  chartStyle: {
    marginVertical: 12,
    borderRadius: 12,
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 16,
    alignItems: 'center',
  },
  emptyImage: {
    width: 100,
    height: 100,
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

export default WeightChart
