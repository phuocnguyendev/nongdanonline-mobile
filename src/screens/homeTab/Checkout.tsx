import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BuyItem } from '../../api/payment/payment';
import { clearCart } from '../../store/cartSlice';

interface CheckoutScreenProps {
  route: { params?: { cartItems?: any[]; totalAmount?: number } };
}

function CheckoutScreen({ route }: CheckoutScreenProps): React.ReactElement {
  const { cartItems = [], totalAmount = 0 } = route.params || {};
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_qrCode, setQrCode] = useState<string | null>(null);
  const selectFarmID = (state: any): string => state.cart.farmID;
  const farmID = useSelector(selectFarmID);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const decoded: any = jwtDecode(token);
          setUserId(decoded.id || decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    fetchData();
  }, []);

  const buildPaymentData = (items: any[], amount: number, uId: string, fId: string): any => {
    return {
      amount: amount,
      userId: uId,
      paymentMethod: 2, // Assuming 2 is for PayOS
      paymentType: 0,
      farmID: fId,
      listBlocks: items.filter((i) => i.type === 'block').map((i) => ({
        blockID: i.id,
        quantityBlock: i.quantity,
        quantityMonth: i.quantityMonth || 1,
      })),
      listCPs: items.filter((i) => i.type === 'carePackage').map((i) => ({
        carePackageID: i.id,
        quantity: i.quantity,
      })),
    };
  };

  const handlePayment = async (): Promise<void> => {
    if (!userId || !farmID) {
      alert('Vui lòng đăng nhập và chọn nông trại để thanh toán');
      return;
    }
    setIsLoading(true);
    const paymentData = buildPaymentData(cartItems, totalAmount, userId, farmID);

    try {
      const response = await BuyItem(paymentData, paymentData.paymentMethod);
      if (response.status === 200) {
        const { data } = response;
        if (data?.url?.data?.qrCode) {
          setQrCode(data.url.data.qrCode);
          navigation.navigate('QRCodeScreen', { qrCode: data.url.data.qrCode });
        }
        dispatch(clearCart());
      } else {
        alert('Thanh toán thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error with payment request:', error);
      alert('Thanh toán thất bại, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#f9f9f9] p-4">
      <Text className="text-[22px] font-bold text-center mb-5 text-[#00a86b]">Xác Nhận Thanh Toán</Text>
      {cartItems.length === 0 ? (
        <Text className="text-base text-center text-[#555] mt-12">Giỏ hàng của bạn đang trống!</Text>
      ) : (
        <>
          <ScrollView className="flex-1 mb-5">
            <View className="bg-white rounded-lg p-2.5 shadow-sm">
              {cartItems.map((item, index) => (
                <View key={index} className="flex-row justify-between items-center mb-2.5 pb-2.5 border-b border-[#ddd]">
                  <View className="flex-1">
                    <Text className="text-base font-bold text-[#333] mb-1">{item.name}</Text>
                    <Text className="text-sm text-[#555]">{(item.price || 0).toLocaleString('vi-VN')} VND x {item.quantity}</Text>
                    {item.type === 'block' && (
                      <View className="flex-row items-center mt-2.5">
                        <Text className="text-sm text-[#555] mr-2.5">Số tháng thuê:</Text>
                        <Text className="text-base font-bold text-[#333] mx-2.5">{item.quantityMonth || 1}</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-sm font-bold text-[#00a86b]">
                    {(item.price * item.quantity * (item.type === 'block' ? (item.quantityMonth || 1) : 1)).toLocaleString('vi-VN')} VND
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View className="flex-row justify-between items-center p-4 bg-white rounded-lg mb-5 shadow-sm">
            <Text className="text-lg font-bold text-[#333]">Tổng tiền:</Text>
            <Text className="text-lg font-bold text-[#00a86b]">{totalAmount.toLocaleString('vi-VN')} VND</Text>
          </View>

          <TouchableOpacity className="bg-[#00a86b] py-3.5 rounded-lg items-center" onPress={handlePayment} disabled={isLoading}>
            <Text className="text-white text-base font-bold">{isLoading ? 'Đang xử lý...' : 'Xác Nhận Thanh Toán'}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default CheckoutScreen;
