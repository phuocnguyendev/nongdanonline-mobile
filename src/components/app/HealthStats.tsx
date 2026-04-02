import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface HealthStatsData {
  weight?: number;
  feedIntake?: number;
}

interface HealthStatsProps {
  data: HealthStatsData[];
}

const HealthStats: React.FC<HealthStatsProps> = ({ data }) => {
  const latestRecord = data[0] || {};

  return (
    <View className="bg-white rounded-[10px] p-4 shadow-sm mt-4">
      <Text className="text-lg font-bold mb-4 text-[#2C3E50]">Thông Tin Mới Nhất</Text>

      <View className="flex-row items-center mb-4">
        <FontAwesome5 name="weight" size={24} color="#3498DB" style={{ marginRight: 12 }} />
        <View>
          <Text className="text-sm text-[#7F8C8D]">Cân nặng</Text>
          <Text className="text-base font-bold text-[#34495E]">
            {isNaN(latestRecord.weight!) || latestRecord.weight == null
              ? 0
              : (latestRecord.weight / 1000).toFixed(2)}{' '}
            kg
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4">
        <FontAwesome5 name="utensils" size={24} color="#2ECC71" style={{ marginRight: 12 }} />
        <View>
          <Text className="text-sm text-[#7F8C8D]">Lượng thức ăn</Text>
          <Text className="text-base font-bold text-[#34495E]">
            {latestRecord.feedIntake && !isNaN(latestRecord.feedIntake)
              ? latestRecord.feedIntake.toFixed(2)
              : 'Chưa có thức ăn'}
            /ngày
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HealthStats;
