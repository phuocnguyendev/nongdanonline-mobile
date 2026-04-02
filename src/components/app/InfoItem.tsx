import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InfoItemProps {
  label: string;
  value: string | number;
  iconName: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, iconName }) => {
  return (
    <View className="flex-[0.48] bg-white p-4 rounded-lg shadow-sm justify-center min-h-[100px] mb-4">
      <View className="flex-row items-center">
        <Ionicons name={iconName} size={20} color="#00a86b" />
        <Text className="text-sm font-bold text-[#333] ml-2">{label}:</Text>
      </View>
      <Text className="text-base text-[#555] mt-1">{value}</Text>
    </View>
  );
};

export default InfoItem;
