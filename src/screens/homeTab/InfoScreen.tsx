import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { formattedDate } from '../../utils/Format';

interface InfoScreenProps { blockData: { endDate: string }; }

const InfoScreen: React.FC<InfoScreenProps> = ({ blockData }) => {
  const endDate = blockData.endDate;
  const calculateRemainingDays = (expirationDate: string): number => {
    const end = new Date(expirationDate);
    return Math.max(0, Math.ceil((end.getTime() - new Date().getTime()) / (1000 * 3600 * 24)));
  };
  const remainingDays = useMemo(() => calculateRemainingDays(endDate), [endDate]);

  return (
    <View className="items-center pt-5">
      <View className="rounded-[10px] p-5 items-center w-full shadow-sm">
        <Text className="text-lg font-bold text-[#333] mb-2.5">Thông tin ô đất</Text>
        <Text className="text-base text-[#555] my-1">Hạn sử dụng ô đất: {formattedDate(endDate)}</Text>
        <Text className="text-base text-[#555] my-1">Ngày còn lại: {remainingDays} ngày</Text>
      </View>
    </View>
  );
};

export default InfoScreen;
