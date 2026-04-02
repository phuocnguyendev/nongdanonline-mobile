import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PackageView from '../../../components/app/packageView';
import ProductView from '../../../components/app/productView';

interface ProductFarmProps {
  navigation: { navigate: (screen: string) => void };
  route: { params: { data: { farmID: string; blocks?: any[]; animals?: any[] } } };
}

export function ProductFarm({ navigation, route }: ProductFarmProps): React.ReactElement {
  const { data } = route.params;
  const farmID = data.farmID;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1">
        <TouchableOpacity
          onPress={() => navigation.navigate('Farm Info')}
          className="flex-row justify-start items-center p-5"
        >
          <Ionicons name="arrow-back" size={22} color="#00a86b" />
          <Text className="text-lg ml-2.5 font-bold text-[#00a86b]">Thông tin Trang trại</Text>
        </TouchableOpacity>
        <View className="my-2.5 rounded-[10px]">
          <ProductView blocks={data.blocks || []} farmID={farmID} />
          <PackageView animals={data.animals || []} farmID={farmID} />
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductFarm;
