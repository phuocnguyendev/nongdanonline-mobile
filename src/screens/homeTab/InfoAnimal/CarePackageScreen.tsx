import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { formattedDate } from '../../../utils/Format';

interface CarePackageScreenProps {
  route: { params: { animalData: any; blockData: any; animalOwnerUserId: string } };
  navigation: { navigate: (screen: string, params?: any) => void };
}

const CarePackageScreen: React.FC<CarePackageScreenProps> = ({ route, navigation }) => {
  const { animalData, blockData, animalOwnerUserId } = route.params;
  const carePackages = animalData.userAnimalOwnerCares || [];
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCarePackage, setSelectedCarePackage] = useState<any>(null);

  const handleShowDetails = (carePackage: any): void => {
    setSelectedCarePackage(carePackage);
    setShowDetailsModal(true);
  };

  return (
    <ScrollView className="flex-1 bg-[#f5f5f5] p-5">
      {carePackages.map((carePackage: any, index: number) => (
        <View key={index} className="bg-white p-4 rounded-xl mb-5 shadow-sm">
          <Image source={{ uri: carePackage.carePackageImages }} className="w-full h-[150px] rounded-lg mb-3" />
          <Text className="text-xl font-bold text-[#333] text-center mb-3">{carePackage.carePackageName}</Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#555]">Thời gian sử dụng:</Text>
            <Text className="text-base text-[#333]">{carePackage.timeUseByDay} ngày</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#555]">Số lượng đã sử dụng:</Text>
            <Text className="text-base text-[#333]">{carePackage.quantityCarePackage}</Text>
          </View>

          <TouchableOpacity
            className="bg-[#00a86b] py-3 px-5 rounded-lg mt-4 items-center justify-center"
            onPress={() => navigation.navigate('AddPackageScreen', { blockData, carePackage, animalOwnerUserId })}
          >
            <Text className="text-base text-white font-bold">Thêm gói chăm sóc</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FF6347] py-2 px-5 rounded-lg mt-2.5 items-center justify-center"
            onPress={() => handleShowDetails(carePackage)}
          >
            <Text className="text-base text-white font-bold">Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal visible={showDetailsModal} transparent={true} animationType="fade" onRequestClose={() => setShowDetailsModal(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-5 rounded-lg w-[80%] items-center">
            <Text className="text-lg font-bold mb-2.5">Chi tiết gói chăm sóc</Text>
            <Text className="text-base mb-2.5">
              <Text className="font-bold">Ngày bắt đầu: </Text>
              {formattedDate(selectedCarePackage?.startDate)}
            </Text>
            <Text className="text-base mb-2.5">
              <Text className="font-bold">Ngày kết thúc: </Text>
              {formattedDate(selectedCarePackage?.endDate)}
            </Text>

            <TouchableOpacity className="bg-[#00a86b] py-2.5 px-5 rounded-lg mt-2.5 items-center w-full" onPress={() => setShowDetailsModal(false)}>
              <Text className="text-base text-white font-bold">Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CarePackageScreen;
