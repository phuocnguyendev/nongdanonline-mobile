import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface QRCodeScreenProps { route: { params?: { qrCode?: string } }; navigation: { navigate: (screen: string) => void }; }

function QRCodeScreen({ route, navigation }: QRCodeScreenProps): React.ReactElement {
  const { qrCode } = route.params || {};
  return (
    <View className="flex-1 p-5 justify-center items-center bg-[#f9f9f9]">
      <Text className="text-2xl font-bold text-[#333] mb-5">QR Code Thanh Toán</Text>
      {qrCode ? (
        <View className="items-center mb-8 p-5 bg-white rounded-xl shadow-sm">
          <QRCode value={qrCode} size={250} />
          <Text className="text-base text-[#333] mt-2.5 font-bold">Mã QR của bạn</Text>
        </View>
      ) : (
        <Text className="text-base text-[#888] mt-5">Không có mã QR để hiển thị</Text>
      )}
      <TouchableOpacity className="bg-primary py-3 px-8 rounded-lg items-center mt-5" onPress={() => navigation.navigate('ShoppingCart')}>
        <Text className="text-white text-base font-bold">Trở về</Text>
      </TouchableOpacity>
    </View>
  );
}

export default QRCodeScreen;
