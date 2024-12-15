import React, { useMemo } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const WeightChart = ({ data }) => {
  const screenWidth = Dimensions.get('window').width
  const chartWidth = screenWidth - 40

  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null

    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    )

    const maxPoints = 6
    const step = Math.ceil(sortedData.length / maxPoints)
    const filteredData = sortedData.filter((_, index) => index % step === 0)

    const labels = filteredData.map((record) =>
      new Date(record.date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
      }),
    )

    const weights = filteredData.map((record) =>
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
        <MaterialCommunityIcons
          name="scale-bathroom"
          size={80}
          color="#CBD5E1"
        />
        <Text style={styles.emptyText}>Không có dữ liệu cân nặng</Text>
        <Text style={styles.emptySubText}>
          Hãy thêm dữ liệu cân nặng để xem biểu đồ tăng trưởng
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons name="chart-line" size={24} color="#00A86B" />
          <Text style={styles.title}>Biểu đồ tăng trưởng</Text>
        </View>
        <LineChart
          data={chartData}
          width={Math.max(chartWidth, 300)}
          height={220}
          verticalLabelRotation={30}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#00A86B',
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              strokeWidth: 1,
              stroke: '#E2E8F0',
            },
            propsForLabels: {
              fontSize: 10,
              fontWeight: '500',
            },
          }}
          bezier
          style={styles.chartStyle}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={true}
          yAxisInterval={5}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
})

export default WeightChart
