import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getFarmDetails } from '../../../api/farm';
import { formatVND } from '../../../utils/Format.js';

interface FarmInfoProps {
  navigation: { navigate: (screen: string, params?: any) => void };
  route: { params: { initialFarmData: { farmID: string } } };
}

export function FarmInfo({ navigation, route }: FarmInfoProps): React.ReactElement {
  const { initialFarmData } = route.params;
  const [fetchedFarmData, setFetchedFarmData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const farmID = initialFarmData.farmID;

  useEffect(() => {
    const fetchFarmDetails = async (): Promise<void> => {
      try {
        const response = await getFarmDetails(farmID);
        setFetchedFarmData(response);
      } catch (err) {
        console.error('Error fetching farm details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFarmDetails();
  }, [farmID]);

  const openMap = (link: string): void => {
    Linking.openURL(link).catch((err) => console.error('An error occurred', err));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00a86b" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 p-5">
        <TouchableOpacity
          onPress={() => navigation.navigate('Product Farm', { data: fetchedFarmData })}
          className="flex-row justify-end items-center mb-5"
        >
          <Text className="text-lg mr-2.5 font-bold text-[#00a86b]">Sản phẩm & Dịch vụ</Text>
          <Ionicons name="arrow-forward" size={22} color="#00a86b" />
        </TouchableOpacity>

        {fetchedFarmData && (
          <View className="my-5 rounded-2xl shadow-lg bg-white overflow-hidden">
            <View className="relative">
              <ImageBackground source={{ uri: fetchedFarmData.farmImages[0]?.imagesUrl }} className="w-full h-[200px]" />
            </View>
            <View className="p-5 bg-white rounded-b-2xl">
              <Text className="text-[#00a86b] text-2xl text-center font-bold mb-2.5">{fetchedFarmData.farmName}</Text>
              
              <View className="flex-row items-center my-1.5">
                <Ionicons name="person" size={18} color="#00a86b" />
                <Text className="text-base ml-2.5">
                  <Text className="font-bold">Chủ trang trại: </Text> {fetchedFarmData.farmOwner || 'N/A'}
                </Text>
              </View>
              
              <View className="flex-row items-center my-1.5">
                <Ionicons name="call" size={18} color="#00a86b" />
                <Text className="text-base ml-2.5">
                  <Text className="font-bold">Liên hệ: </Text> {fetchedFarmData.ownerPhone || 'N/A'}
                </Text>
              </View>
              
              <View className="flex-row items-center my-1.5">
                <Ionicons name="location" size={18} color="#00a86b" />
                <Text className="text-base ml-2.5">
                  <Text className="font-bold">Địa chỉ: </Text> {fetchedFarmData.farmAddress || 'N/A'}
                </Text>
              </View>
              
              <View className="flex-row items-center my-1.5">
                <Ionicons name="resize" size={18} color="#00a86b" />
                <Text className="text-base ml-2.5">
                  <Text className="font-bold">Diện tích: </Text> {fetchedFarmData.farmArea || 'N/A'} m²
                </Text>
              </View>
              
              <View className="flex-row items-center my-1.5">
                <Ionicons name="map" size={18} color="#00a86b" />
                <Text className="text-base ml-2.5">
                  <Text className="font-bold">Bản đồ: </Text>
                </Text>
                <TouchableOpacity onPress={() => openMap(fetchedFarmData.mapLink)}>
                  <Text className="text-[#00a86b] underline text-base ml-1.5">Xem bản đồ</Text>
                </TouchableOpacity>
              </View>

              <Text className="text-lg font-bold text-[#00a86b] mt-[15px] mb-[5px]">Khu vực hỗ trợ:</Text>
              {fetchedFarmData.farmProvinceSupports.map((support: any, index: number) => (
                <View key={index} className="flex-row items-center my-1.5">
                  <Ionicons name="location" size={18} color="#00a86b" />
                  <Text className="text-base ml-2.5 flex-1">
                    <Text className="font-bold">Tỉnh: </Text> {support.provinceName} -{' '}
                    <Text className="font-bold">Phí vận chuyển: </Text> {formatVND(support.shippingFee)}
                    <Text className="font-bold">Thời gian giao hàng: </Text> {support.actualDeliveryDate} ngày
                  </Text>
                </View>
              ))}

              <Text className="text-lg font-bold text-[#00a86b] mt-[15px] mb-[5px]">Thông tin Vật nuôi:</Text>
              {fetchedFarmData.animals.map((animal: any, index: number) => (
                <View key={index} className="my-2.5 p-2.5 bg-[#f0f0f0] rounded-[10px]">
                  <ImageBackground source={{ uri: animal.imageUrl }} className="w-full h-[200px] mb-1.5" resizeMode="contain" />
                  <Text className="text-base font-bold text-[#00a86b] mb-1.5">{animal.animalName}</Text>
                  <Text className="text-sm text-[#333]">{animal.animalDescription}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default FarmInfo;
