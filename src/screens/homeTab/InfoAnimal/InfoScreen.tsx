import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import InfoItem from '../../../components/app/InfoItem';
import { formatWeight, formattedDate } from '../../../utils/Format';

interface InfoScreenProps {
  route: { params: { animalData: any } };
}

const InfoScreen: React.FC<InfoScreenProps> = ({ route }) => {
  const { animalData } = route.params;
  const navigation = useNavigation<any>();

  const handleViewHealthRecord = (): void => {
    navigation.navigate('AnimalHealth', {
      animalOwnerId: animalData.animalOwnerUserId,
    });
  };

  return (
    <ScrollView className="flex-1 bg-[#f5f5f5] p-5">
      <View className="mb-5 items-end">
        <TouchableOpacity
          className="bg-[#00A86B] py-3 px-5 rounded-lg"
          onPress={handleViewHealthRecord}
        >
          <Text className="text-white text-base font-bold">Sổ Sức Khỏe</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between mb-4">
        <InfoItem iconName="paw" label="Tên động vật" value={animalData.animalName} />
        <InfoItem iconName="calendar" label="Số ngày nuôi" value={`${animalData.age} ngày`} />
      </View>

      <View className="flex-row justify-between mb-4">
        <InfoItem iconName="calendar-sharp" label="Ngày bắt đầu" value={formattedDate(animalData.startDate)} />
        <InfoItem iconName="calendar-outline" label="Ngày kết thúc dự kiến" value={formattedDate(animalData.endDate)} />
      </View>

      <View className="flex-row justify-between mb-4">
        <InfoItem iconName="fitness-outline" label="Cân nặng" value={formatWeight(animalData.weight)} />
      </View>
    </ScrollView>
  );
};

export default InfoScreen;
