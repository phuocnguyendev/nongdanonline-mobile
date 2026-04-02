import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItem, Text, View } from 'react-native';
import { getMyPackages } from '../../api/farm';

interface PackageItem { myPackageID: string; carePackageName: string; carePackageImages: string; myPackagePrice: number; stock: number; timeUseByDay: number; }

function MyPackageList(): React.ReactElement {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async (): Promise<void> => { setLoading(true); const data = await getMyPackages(); setPackages(data); setLoading(false); };
    fetchPackages();
  }, []);

  const renderItem: ListRenderItem<PackageItem> = ({ item }) => (
    <View className="flex-row p-2.5 my-1.5 bg-[#f9f9f9] rounded-lg shadow-sm">
      <Image source={{ uri: item.carePackageImages }} className="w-[50px] h-[50px] rounded-lg" />
      <View className="ml-2.5 flex-1">
        <Text className="text-base font-bold text-[#333]">{item.carePackageName}</Text>
        <Text className="text-sm text-blue-500">Giá: {item.myPackagePrice}</Text>
        <Text>Tồn kho: {item.stock}</Text>
        <Text>Thời gian sử dụng: {item.timeUseByDay} ngày</Text>
      </View>
    </View>
  );

  return (
    <View className="mt-5 p-4 bg-white rounded-[10px] shadow-sm">
      <View className="flex-row justify-between items-center mb-2.5">
        <Text className="text-lg font-bold text-[#333]">Gói chăm sóc của bạn</Text>
      </View>
      {loading ? <ActivityIndicator size="large" color="#00a86b" /> :
        packages.length === 0 ? <Text className="text-center text-base text-gray-500">No packages available</Text> :
        <FlatList data={packages} renderItem={renderItem} keyExtractor={(item) => item.myPackageID} scrollEnabled={false} />}
    </View>
  );
}

export default MyPackageList;
