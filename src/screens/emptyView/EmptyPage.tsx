import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';

export function EmptyPage(): React.ReactElement {
  return (
    <SafeAreaView className="flex-1 justify-center items-center p-5 bg-[#f4f4f4]">
      <Text className="text-[22px] font-bold text-center text-[#2d3436] mb-4">
        Có vẻ như bạn chưa có trang trại
      </Text>
      <Image
        source={require('../../assets/images/farm.png')}
        className="w-[280px] h-[230px] mb-6"
      />
      <Text className="text-xl text-[#636e72] text-center mb-8">
        Tạo trang trại của bạn ngay bây giờ
      </Text>
      <TouchableOpacity
        className="bg-[#27ae60] py-3.5 px-10 rounded-lg shadow"
        onPress={() => alert('Tạo trang trại')}
      >
        <Text className="text-white text-lg font-semibold">Tạo ngay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
