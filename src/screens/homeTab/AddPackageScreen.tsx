import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { addPackage, getAnimalPackage } from '../../api/farm';

interface AddPackageScreenProps {
  route: { params: { blockData: any } };
  navigation: { navigate: (screen: string, params?: any) => void };
}

export default function AddPackageScreen({ route, navigation }: AddPackageScreenProps): React.ReactElement {
  const { blockData } = route.params;
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [carePackages, setCarePackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const animalID = useMemo(() => blockData?.animalOwnerUsers?.[0]?.animalID, [blockData]);
  const animalOwnerUserId = useMemo(() => blockData?.animalOwnerUsers?.[0]?.animalOwnerUserId, [blockData]);

  useEffect(() => {
    const fetchPackage = async (): Promise<void> => {
      try {
        const packageData = await getAnimalPackage(animalID);
        setCarePackages(packageData);
      } catch (error) {
        console.error('Failed to fetch package:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [animalID]);

  const handleAddPackage = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    const qty = parseInt(quantity, 10);
    if (!selectedPackage || !quantity || isNaN(qty) || qty <= 0) {
      Alert.alert('Lỗi', 'Please select a package and enter a valid quantity.');
      return;
    }

    const data = {
      animalUserId: animalOwnerUserId,
      myPackageId: selectedPackage,
      quantityCarePackage: qty,
    };
    try {
      await addPackage(data);
      Alert.alert('Thành công', 'Gói đã được thêm thành công', [
        { text: 'OK', onPress: () => navigation.navigate('My Farm', { refresh: true }) },
      ]);
    } catch (error) {
      console.error('Failed to add package:', error);
      Alert.alert('Lỗi', 'Failed to add package. Please try again.');
    }
  }, [selectedPackage, quantity, animalOwnerUserId, navigation]);

  const selectedPackageDetails = useMemo(() => {
    return carePackages.find((pkg) => pkg.myPackageID === selectedPackage) || {};
  }, [selectedPackage, carePackages]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00a86b" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white p-5 justify-start items-center">
          <Text className="text-lg font-bold mb-5 text-center text-[#333]">Chọn Gói Chăm Sóc Từ Kho Của Bạn</Text>
          <Text className="text-base self-start mt-2.5 text-[#333]">Chọn gói:</Text>
          
          <DropDownPicker
            open={openDropdown}
            value={selectedPackage}
            items={carePackages.map((pkg) => ({
              label: `${pkg.carePackageName} - ${pkg.myPackagePrice.toLocaleString()} VND - Stock: ${pkg.stock}`,
              value: pkg.myPackageID,
            }))}
            setOpen={setOpenDropdown}
            setValue={setSelectedPackage}
            setItems={setCarePackages}
            placeholder="Chọn gói"
            containerStyle={{ width: '100%', marginTop: 10 }}
            style={{ backgroundColor: '#f9f9f9', borderColor: '#ddd' }}
            dropDownContainerStyle={{ backgroundColor: '#f9f9f9', borderColor: '#ddd' }}
            zIndex={3000}
            zIndexInverse={1000}
          />

          {selectedPackage && (
            <View className="w-full mt-2.5 p-2.5 bg-[#f9f9f9] rounded-md border border-[#ddd]">
              <Text className="text-sm text-[#555] my-1">Thời gian sử dụng: {selectedPackageDetails.timeUseByDay} ngày</Text>
              <Text className="text-sm text-[#555] my-1">Giá: {selectedPackageDetails.myPackagePrice?.toLocaleString()} VND</Text>
              <Text className="text-sm text-[#555] my-1">Số lượng còn: {selectedPackageDetails.stock}</Text>
            </View>
          )}

          <Text className="text-base self-start mt-2.5 text-[#333]">Số lượng:</Text>
          <TextInput
            className="w-full h-10 border border-[#ddd] rounded-md px-2.5 mt-2.5 bg-white text-base"
            value={quantity}
            keyboardType="numeric"
            onChangeText={setQuantity}
            onSubmitEditing={Keyboard.dismiss}
          />

          <View className="flex-row justify-between mt-5 w-full">
            <TouchableOpacity className="bg-[#00a86b] py-3 rounded-md flex-1 items-center mx-1" onPress={handleAddPackage}>
              <Text className="text-white font-bold text-base">Thêm gói</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
