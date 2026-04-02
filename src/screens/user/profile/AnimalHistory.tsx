import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { getAnimalHistory } from '../../../api/farm/Farm';
import { formattedDate } from '../../../utils/Format';

const AnimalHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchUserIdAndHistory = async (): Promise<void> => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id || decodedToken.sub || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const response = await getAnimalHistory(userId);
        setHistoryData(response.data.data);
      } catch (error) { console.error('Error fetching history data:', error); }
      finally { setLoading(false); }
    };
    fetchUserIdAndHistory();
  }, []);

  const handleViewHealth = (animalOwnerUserId: string): void => { navigation.navigate('AnimalHealth', { animalOwnerId: animalOwnerUserId }); };
  const handleShowDetails = (item: any): void => { setSelectedItem(item); };
  const handleCloseModal = (): void => { setSelectedItem(null); };

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row bg-white p-4 rounded-xl mb-4 shadow-sm elevation-[3] border border-[#ecf0f1]">
      <Image source={{ uri: item.animalStageImageUrl }} className="w-20 h-20 rounded-lg mr-4" />
      <View className="flex-1 justify-center">
        <Text className="text-base font-semibold text-[#34495E] mb-2">{item.animalName}</Text>
      </View>
      <View className="justify-center items-center">
        <TouchableOpacity className="bg-[#3498DB] py-2 px-4 rounded-lg mb-2 shadow-sm" onPress={() => handleShowDetails(item)}>
          <Text className="text-white text-[10px] font-semibold">Chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#2ECC71] py-2 px-4 rounded-lg shadow-sm" onPress={() => handleViewHealth(item.animalOwnerUserId)}>
          <Text className="text-white text-[10px] font-semibold">Sổ sức khỏe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-[#F8F9FB]">
      <Text className="text-[26px] font-bold text-center mb-5 text-[#2C3E50]">Lịch sử chăn nuôi</Text>
      {loading ? (
        <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#0000ff" /></View>
      ) : historyData.length === 0 ? (
        <Text className="text-center text-[#7F8C8D] text-base">Không có dữ liệu</Text>
      ) : (
        <FlatList data={historyData} keyExtractor={(item) => item.animalOwnerUserId.toString()} renderItem={renderItem} />
      )}

      {selectedItem && (
        <Modal animationType="slide" transparent={true} visible={!!selectedItem} onRequestClose={handleCloseModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-white p-5 rounded-xl shadow-lg">
              <Text className="text-[22px] font-bold mb-4 text-center text-[#2C3E50]">Thông tin chi tiết</Text>

              <View className="mb-4">
                <Text className="text-lg font-bold mb-2 text-[#2C3E50]">Thông tin cơ bản</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Tên vật nuôi:</Text> {selectedItem.animalOwnerUserName}</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Mã động vật:</Text> {selectedItem.animalOwnerUserCode}</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Tuổi:</Text> {selectedItem.age} ngày</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Trọng lượng:</Text> {(selectedItem.weight / 1000).toFixed(2)} kg</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Chuồng nuôi:</Text> {selectedItem.penCode}</Text>
              </View>

              <View className="mb-4">
                <Text className="text-lg font-bold mb-2 text-[#2C3E50]">Thông tin thời gian & chi phí</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Trạng thái:</Text> {selectedItem.developStage === 'SHIP' ? 'Đã xuất chuồng' : 'Khác'}</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Ngày bắt đầu nuôi:</Text> {formattedDate(selectedItem.startDate)}</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Ngày kết thúc nuôi:</Text> {formattedDate(selectedItem.endDate)}</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Phí vệ sinh chuồng:</Text> {selectedItem.cleanFee.toLocaleString()} VND</Text>
                <Text className="text-base text-[#34495E] mb-2 leading-[22px]"><Text className="font-bold">Giá ô đất:</Text> {selectedItem.blockOwnerUser?.blockPrice?.toLocaleString() || 'N/A'} VND</Text>
              </View>

              {selectedItem.userAnimalOwnerCares?.length > 0 && (
                <View className="mb-4">
                  <Text className="text-lg font-bold mb-2 text-[#2C3E50]">Thông tin gói chăm sóc</Text>
                  {selectedItem.userAnimalOwnerCares.map((care: any, index: number) => (
                    <View key={index} className="flex-row items-center mb-3 p-2 bg-[#F4F6F7] rounded-lg">
                      <Image source={{ uri: care.carePackageImages }} className="w-[50px] h-[50px] rounded mr-4" />
                      <View className="flex-1">
                        <Text className="text-base text-[#34495E] leading-[22px] flex-shrink"><Text className="font-bold">Tên gói:</Text> {care.carePackageName}</Text>
                        <Text className="text-base text-[#34495E] leading-[22px]"><Text className="font-bold">Số lượng:</Text> {care.quantityCarePackage}</Text>
                        <Text className="text-base text-[#34495E] leading-[22px]"><Text className="font-bold">Thời gian sử dụng:</Text> {care.timeUseByDay} ngày</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              <TouchableOpacity className="bg-[#E74C3C] py-2.5 px-5 rounded-lg self-center mt-4" onPress={handleCloseModal}>
                <Text className="text-white font-bold text-base">Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default AnimalHistory;
