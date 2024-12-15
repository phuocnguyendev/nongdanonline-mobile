import React, { useMemo } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const FeedChart = ({ data, isLoading }) => {
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

    const feedIntakeValues = filteredData.map(
      (record) => record.feedIntake || 0,
    )
    const hasValidData = feedIntakeValues.some((value) => value > 0)

    if (!hasValidData) return null

    return {
      labels: filteredData.map((record) =>
        new Date(record.date).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
        }),
      ),
      datasets: [
        {
          data: feedIntakeValues,
          color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Lượng thức ăn (g)'],
    }
  }, [data])

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#FF9F40" />
        <Text style={styles.emptyText}>Đang tải dữ liệu...</Text>
      </View>
    )
  }

  if (!chartData) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="food-variant" size={80} color="#CBD5E1" />
        <Text style={styles.emptyText}>Không có dữ liệu thức ăn</Text>
        <Text style={styles.emptySubText}>
          Hãy thêm dữ liệu thức ăn để xem biểu đồ theo dõi
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
          <MaterialCommunityIcons name="chart-line" size={24} color="#FF9F40" />
          <Text style={styles.title}>Biểu đồ lượng thức ăn</Text>
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
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#FF7F50',
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
            formatYLabel: (value) => `${value}g`,
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

export default FeedChart
