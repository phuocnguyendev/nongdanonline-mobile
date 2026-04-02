import React, { useMemo } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface WeightData {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightData[];
}

const WeightChart: React.FC<WeightChartProps> = ({ data }) => {
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
    const labels = filteredData.map((record) =>
      new Date(record.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
    );
    const weights = filteredData.map((record) =>
      record.weight ? parseFloat((record.weight / 1000).toFixed(2)) : 0,
    );
    return {
      labels,
      datasets: [{ data: weights, color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`, strokeWidth: 2 }],
      legend: ['Cân nặng (kg)'],
    };
  }, [data]);

  if (!chartData) {
    return (
      <View className="bg-white rounded-2xl p-5 shadow-sm m-2.5 items-center min-h-[180px] justify-center">
        <MaterialCommunityIcons name="scale-bathroom" size={80} color="#CBD5E1" />
        <Text className="text-[15px] text-slate-500 text-center font-semibold mt-4">Không có dữ liệu cân nặng</Text>
        <Text className="text-[13px] text-slate-400 text-center mt-2 px-5">Hãy thêm dữ liệu cân nặng để xem biểu đồ tăng trưởng</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-white rounded-2xl p-4 shadow-sm m-2.5">
        <View className="flex-row items-center justify-center mb-3">
          <MaterialCommunityIcons name="chart-line" size={24} color="#00A86B" />
          <Text className="text-base font-bold text-slate-800 ml-2 text-center uppercase tracking-wide">Biểu đồ tăng trưởng</Text>
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
            style: { borderRadius: 16 },
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#00A86B' },
            propsForBackgroundLines: { strokeDasharray: '', strokeWidth: 1, stroke: '#E2E8F0' },
            propsForLabels: { fontSize: 10, fontWeight: '500' },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
          withInnerLines fromZero yAxisInterval={5}
        />
      </View>
    </ScrollView>
  );
};

export default WeightChart;
