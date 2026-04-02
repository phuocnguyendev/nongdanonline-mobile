import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToCart } from '../../store/cartSlice';
import { formatVND } from '../../utils/Format';
import type { RootState } from '../../store/store';

interface BlockItem {
  blockID: string;
  blockName: string;
  blockDescription: string;
  blockPrice: number;
  imageUrl: string;
  rentTimeByDay: number;
}

interface ProductViewProps {
  blocks: BlockItem[];
  farmID: string;
}

const ProductView: React.FC<ProductViewProps> = ({ blocks, farmID }) => {
  const [showProduct, setShowProduct] = useState(false);
  const dispatch = useDispatch();
  const currentFarmID = useSelector((state: RootState) => state.cart.farmID);

  const handleShowProduct = (): void => {
    setShowProduct(!showProduct);
  };

  const handleAddToCart = (block: BlockItem): void => {
    if (!block || !block.blockID) {
      alert('Sản phẩm không hợp lệ.');
      return;
    }
    if (currentFarmID && currentFarmID !== farmID) {
      alert('Cannot add items from a different farm.');
      return;
    }
    dispatch(
      addToCart({
        item: {
          id: block.blockID,
          uniqueIdentifier: '',
          name: block.blockName,
          price: block.blockPrice,
          image: block.imageUrl,
          type: 'block',
          farmID,
          quantity: 1,
        },
      }),
    );
    alert(`${block.blockName} đã được thêm vào giỏ hàng!`);
  };

  return (
    <View className="my-2.5 py-4 px-4 rounded-[10px] shadow-sm bg-[#f9f9f9]">
      <TouchableOpacity onPress={handleShowProduct}>
        <View className="flex-row items-center pb-2.5 border-b border-[#ddd]">
          <Ionicons name="cube-outline" size={24} color="#00a86b" />
          <Text className="text-lg font-bold text-primary flex-1 text-center">Sản Phẩm Từ Trang Trại</Text>
          <Ionicons name={showProduct ? 'chevron-up' : 'chevron-down'} size={24} color="#00a86b" />
        </View>
      </TouchableOpacity>

      {showProduct && (
        <View className="flex-row flex-wrap justify-between mt-2.5">
          {blocks.map((block, index) => (
            <View key={index} className="w-[48%] rounded-[10px] border border-[#ddd] p-2.5 mb-4 bg-white shadow-sm items-center">
              <Image
                className="w-full h-[120px] rounded-lg mb-2.5"
                source={{ uri: block.imageUrl || 'https://via.placeholder.com/150' }}
              />
              <View className="items-start w-full">
                <Text className="text-base font-bold text-[#333] mb-1.5" numberOfLines={1}>{block.blockName}</Text>
                <Text className="text-sm text-[#555] mb-2" numberOfLines={2}>{block.blockDescription}</Text>
                <View className="flex-row items-center mb-1.5">
                  <Ionicons name="cash-outline" size={16} color="#00a86b" />
                  <Text className="text-sm ml-1.5 text-[#333] font-semibold">{formatVND(block.blockPrice)}</Text>
                </View>
                <View className="flex-row items-center mb-1.5">
                  <Ionicons name="calendar-clear-outline" size={16} color="#00a86b" />
                  <Text className="text-sm ml-1.5 text-[#333]">{block.rentTimeByDay} ngày thuê</Text>
                </View>
              </View>
              <TouchableOpacity
                className="mt-2.5 bg-primary py-2 px-3 rounded-md flex-row items-center justify-center"
                onPress={() => handleAddToCart(block)}
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text className="text-white text-sm ml-1.5 font-bold">Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductView;
