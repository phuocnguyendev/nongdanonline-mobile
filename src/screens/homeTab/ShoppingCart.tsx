import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQuantity,
  decrementQuantityMonth,
  incrementQuantity,
  incrementQuantityMonth,
  removeFromCart,
} from '../../store/cartSlice';

interface ShoppingCartProps {
  navigation: { navigate: (screen: string, params?: any) => void };
}

export default function ShoppingCart({ navigation }: ShoppingCartProps): React.ReactElement {
  const cartItems = useSelector((state: any) => state.cart.cartItems || []);
  const totalPrice = useSelector((state: any) => state.cart.totalPrice || 0);
  const dispatch = useDispatch();

  return (
    <View className="flex-1 bg-[#f9f9f9]">
      {cartItems.length === 0 ? (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text className="text-center text-base text-[#555] mt-5">
            Giỏ hàng của bạn trống! Quay về danh sách nông trại
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <ScrollView className="flex-1 px-4">
            {cartItems.map((item: any) => {
              const uniqueKey = item.uniqueIdentifier || `${item.id}-${item.name}`;
              return (
                <View key={uniqueKey} className="flex-row items-center p-2.5 rounded-lg my-2 bg-white shadow-sm">
                  <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }} className="w-[80px] h-[80px] rounded-lg mr-2.5" />
                  <View className="flex-1 justify-center">
                    <Text className="text-base font-bold text-[#333] mb-1">{item.name || 'Sản phẩm không có tên'}</Text>
                    <Text className="text-sm text-[#555]">Giá: {(item.price || 0).toLocaleString('vi-VN')} VND</Text>

                    {item.type === 'block' && (
                      <View className="flex-row items-center mt-2.5">
                        <Text className="text-sm text-[#555] mr-2.5">Số tháng thuê:</Text>
                        <TouchableOpacity onPress={() => { if (item.quantityMonth > 1) dispatch(decrementQuantityMonth(item.uniqueIdentifier)); }} className="px-1">
                          <Ionicons name="remove-circle-outline" size={24} color="#00a86b" />
                        </TouchableOpacity>
                        <Text className="text-base font-bold text-[#333] mx-2.5">{item.quantityMonth || 1}</Text>
                        <TouchableOpacity onPress={() => dispatch(incrementQuantityMonth(item.uniqueIdentifier))} className="px-1">
                          <Ionicons name="add-circle-outline" size={24} color="#00a86b" />
                        </TouchableOpacity>
                      </View>
                    )}

                    <View className="flex-row items-center mt-2.5">
                      <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.uniqueIdentifier))} className="px-1">
                        <Ionicons name="remove-circle-outline" size={24} color="#00a86b" />
                      </TouchableOpacity>
                      <Text className="text-base font-bold text-[#333] mx-2.5">{item.quantity || 1}</Text>
                      <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.uniqueIdentifier))} className="px-1">
                        <Ionicons name="add-circle-outline" size={24} color="#00a86b" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => dispatch(removeFromCart(item.uniqueIdentifier))} className="p-2.5">
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <View className="p-4 border-t border-[#ddd] bg-white">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-[#333]">Tổng tiền:</Text>
              <Text className="text-lg font-bold text-[#00a86b]">{(totalPrice || 0).toLocaleString('vi-VN')} VND</Text>
            </View>
            <TouchableOpacity className="bg-[#00a86b] py-3 rounded-md items-center" onPress={() => navigation.navigate('Checkout', { cartItems, totalAmount: totalPrice })}>
              <Text className="text-white text-base font-bold">Thanh Toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
