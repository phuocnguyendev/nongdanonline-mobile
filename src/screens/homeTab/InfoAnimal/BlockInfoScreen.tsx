import React from 'react';
import { ScrollView, View } from 'react-native';
import InfoItem from '../../../components/app/InfoItem';
import { formattedDate, formatVND } from '../../../utils/Format';

interface BlockInfoScreenProps {
  route: { params: { animalData: { blockOwnerUser?: any } } };
}

const BlockInfoScreen: React.FC<BlockInfoScreenProps> = ({ route }) => {
  const { animalData } = route.params;
  const blockInfo = animalData.blockOwnerUser || {};

  return (
    <ScrollView className="flex-1 bg-[#f5f5f5] p-5">
      <View className="flex-row justify-between flex-wrap mb-4">
        <InfoItem iconName="home-outline" label="Mã ô đất" value={blockInfo.blockUserCode} />
        <InfoItem iconName="pricetag" label="Giá thuê ô đất" value={formatVND(blockInfo.blockPrice)} />
      </View>

      <View className="flex-row justify-between flex-wrap mb-4">
        <InfoItem iconName="checkmark-circle-outline" label="Trạng thái" value={blockInfo.status ? 'Có sẵn' : 'Không có sẵn'} />
        <InfoItem iconName="calendar-sharp" label="Ngày bắt đầu" value={formattedDate(blockInfo.startDate)} />
      </View>

      <View className="flex-row justify-between flex-wrap mb-4">
        <InfoItem iconName="calendar-outline" label="Ngày kết thúc" value={formattedDate(blockInfo.endDate)} />
      </View>
    </ScrollView>
  );
};

export default BlockInfoScreen;
