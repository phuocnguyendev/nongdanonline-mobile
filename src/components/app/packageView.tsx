import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToCart } from '../../store/cartSlice';
import type { RootState } from '../../store/store';

interface CarePackage {
  carePackageID: string;
  carePackageName: string;
  carePackagePrice: number;
  carePackageImages: string;
  timeUseByDay: number;
}

interface AnimalItem {
  animalID: string;
  animalName: string;
  imageUrl: string;
  animalTypeResponse?: { animalTypeName: string };
  carePackages: CarePackage[];
}

interface PackageViewProps {
  animals: AnimalItem[];
  farmID: string;
}

const PackageView: React.FC<PackageViewProps> = ({ animals, farmID }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const dispatch = useDispatch();
  const currentFarmID = useSelector((state: RootState) => state.cart.farmID);

  const handleShowPackages = (animalID: string): void => {
    setSelectedAnimal(selectedAnimal === animalID ? null : animalID);
  };

  const handleAddToCart = (packageItem: CarePackage): void => {
    if (!packageItem || !packageItem.carePackageID) {
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
          id: packageItem.carePackageID,
          uniqueIdentifier: '',
          name: packageItem.carePackageName,
          price: packageItem.carePackagePrice,
          image: packageItem.carePackageImages,
          type: 'product',
          farmID,
          quantity: 1,
        },
      }),
    );
    alert(`${packageItem.carePackageName} đã được thêm vào giỏ hàng!`);
  };

  return (
    <View className="p-2.5 bg-white">
      <Text className="text-lg text-center font-bold text-primary mb-2">
        Danh sách gói chăm sóc cho động vật
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {animals.map((animal) => (
          <TouchableOpacity
            key={animal.animalID}
            className="w-[30%] rounded-lg border border-[#ccc] p-2 my-1.5 bg-[#f9f9f9] items-center"
            onPress={() => handleShowPackages(animal.animalID)}
          >
            <Image
              className="w-full h-[80px] rounded-lg mb-1.5"
              source={{ uri: animal.imageUrl || 'https://via.placeholder.com/150' }}
            />
            <Text className="text-xs font-bold text-center text-[#333] mb-1" numberOfLines={1}>
              {animal.animalName || 'Unknown Animal'}
            </Text>
            <View className="flex-row items-center my-0.5">
              <Ionicons name="bulb-outline" size={14} color="#00a86b" />
              <Text className="text-[10px] font-bold ml-1 text-primary">
                {animal.animalTypeResponse?.animalTypeName || 'Unknown Type'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedAnimal && (
        <View className="flex-row flex-wrap justify-between mt-2.5">
          {animals
            .find((animal) => animal.animalID === selectedAnimal)
            ?.carePackages.map((pkg) => (
              <View key={pkg.carePackageID} className="w-[48%] rounded-lg border border-[#ccc] p-2 mb-2.5 bg-white shadow-sm">
                <Image
                  className="w-full h-[80px] rounded-lg mb-1.5"
                  source={{ uri: pkg.carePackageImages || 'https://via.placeholder.com/150' }}
                />
                <Text className="text-xs font-bold text-[#333] mb-1" numberOfLines={1}>
                  {pkg.carePackageName || 'Unknown Package'}
                </Text>
                <Text className="text-xs text-[#333] mb-1.5">
                  Giá: {pkg.carePackagePrice ? `${pkg.carePackagePrice} ₫` : 'N/A'}
                </Text>
                <Text className="text-xs text-[#333] mb-1.5">
                  Thời gian sử dụng: {pkg.timeUseByDay} ngày
                </Text>
                <TouchableOpacity
                  className="mt-1.5 bg-primary py-1.5 px-2 rounded-md flex-row items-center justify-center"
                  onPress={() => handleAddToCart(pkg)}
                >
                  <Ionicons name="cart-outline" size={20} color="#fff" />
                  <Text className="text-white text-xs ml-1.5 font-bold">Thêm vào giỏ</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

export default PackageView;
