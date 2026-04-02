import React, { useMemo } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface FeedData {
  date: string;
  feedIntake: number;
}

interface FeedChartProps {
  data: FeedData[];
  isLoading?: boolean;
}

const FeedChart: React.FC<FeedChartProps> = ({ data, isLoading }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40;

  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const maxPoints = 6;
    const step = Math.ceil(sortedData.length / maxPoints);
    const filteredData = sortedData.filter((_, index) => index % step === 0);
    const feedIntakeValues = filteredData.map((record) => record.feedIntake || 0);
    const hasValidData = feedIntakeValues.some((value) => value > 0);
    if (!hasValidData) return null;
    return {
      labels: filteredData.map((record) =>
        new Date(record.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      ),
      datasets: [{ data: feedIntakeValues, color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`, strokeWidth: 2 }],
      legend: ['Lượng thức ăn (g)'],
    };
  }, [data]);

  if (isLoading) {
    return (
      <View className="bg-white rounded-2xl p-5 shadow-sm m-2.5 items-center min-h-[180px] justify-center">
        <ActivityIndicator size="large" color="#FF9F40" />
        <Text className="text-[15px] text-slate-500 text-center font-semibold mt-4">Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (!chartData) {
    return (
      <View className="bg-white rounded-2xl p-5 shadow-sm m-2.5 items-center min-h-[180px] justify-center">
        <MaterialCommunityIcons name="food-variant" size={80} color="#CBD5E1" />
        <Text className="text-[15px] text-slate-500 text-center font-semibold mt-4">Không có dữ liệu thức ăn</Text>
        <Text className="text-[13px] text-slate-400 text-center mt-2 px-5">Hãy thêm dữ liệu thức ăn để xem biểu đồ theo dõi</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-white rounded-2xl p-4 shadow-sm m-2.5">
        <View className="flex-row items-center justify-center mb-3">
          <MaterialCommunityIcons name="chart-line" size={24} color="#FF9F40" />
          <Text className="text-base font-bold text-slate-800 ml-2 text-center uppercase tracking-wide">Biểu đồ lượng thức ăn</Text>
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
            style: { borderRadius: 16 },
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#FF7F50' },
            propsForBackgroundLines: { strokeDasharray: '', strokeWidth: 1, stroke: '#E2E8F0' },
            propsForLabels: { fontSize: 10, fontWeight: '500' },
            formatYLabel: (value: string) => `${value}g`,
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
          withInnerLines fromZero yAxisInterval={5}
        />
      </View>
    </ScrollView>
  );
};

export default FeedChart;
