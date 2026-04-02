import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addAnimalToFarm, getAnimalPackage, getFarmAnimal } from '../../api/farm/index';

interface DropdownItem { label: string; value: string; details?: string; }
interface AddAnimalScreenProps { route: { params: { blockData: { blockOwnerUserID: string; animalTypeID: string }; farmID: string } }; navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void }; }

export default function AddAnimalScreen({ route, navigation }: AddAnimalScreenProps): React.ReactElement {
  const { blockData, farmID } = route.params;
  const { blockOwnerUserID, animalTypeID } = blockData;
  const [animalOptions, setAnimalOptions] = useState<DropdownItem[]>([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [packageOptions, setPackageOptions] = useState<DropdownItem[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [customAnimalName, setCustomAnimalName] = useState('');
  const [openAnimalDropdown, setOpenAnimalDropdown] = useState(false);
  const [openPackageDropdown, setOpenPackageDropdown] = useState(false);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState('');

  useEffect(() => {
    const fetchAnimals = async (): Promise<void> => {
      try {
        const animals = await getFarmAnimal(farmID, animalTypeID);
        setAnimalOptions(animals.map((a: any) => ({ label: a.animalName, value: a.animalID })));
      } catch (error) { console.error('Error fetching animals:', error); }
    };
    if (farmID && animalTypeID) fetchAnimals();
  }, [farmID, animalTypeID]);

  const handleSelectAnimal = useCallback(async (animalId: string | null) => {
    setSelectedAnimalId(animalId);
    if (animalId) {
      try {
        const pkgs = await getAnimalPackage(animalId);
        setPackageOptions(pkgs.map((p: any) => ({ label: `${p.carePackageName} - ${p.myPackagePrice} VND`, value: p.myPackageID, details: `Số lượng còn: ${p.stock} | Thời gian: ${p.timeUseByDay} ngày` })));
      } catch { setPackageOptions([]); }
    } else setPackageOptions([]);
  }, []);

  const handleSelectPackage = (packageId: string): void => {
    const pkg = packageOptions.find((p) => p.value === packageId);
    setSelectedPackageId(packageId);
    setSelectedPackageDetails(pkg?.details || '');
  };

  const handleAddAnimal = useCallback(async () => {
    const missing: string[] = [];
    if (!selectedAnimalId) missing.push('Động vật');
    if (!selectedPackageId) missing.push('Gói chăm sóc');
    if (!customAnimalName.trim()) missing.push('Tên tùy chỉnh');
    if (missing.length > 0) { Alert.alert('Thông tin không hợp lệ', `Vui lòng nhập: ${missing.join(', ')}`); return; }
    try {
      await addAnimalToFarm({ blockOwnerUserID, animalId: selectedAnimalId!, animalName: customAnimalName, myPackageId: selectedPackageId! });
      Alert.alert('Thành công', 'Động vật đã được thêm thành công', [{ text: 'OK', onPress: () => navigation.navigate('My Farm', { refresh: true }) }]);
    } catch (error) { console.error('Error adding animal:', error); }
  }, [blockOwnerUserID, selectedAnimalId, selectedPackageId, customAnimalName, navigation]);

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-base font-bold mt-5 mb-2.5">Chọn động vật</Text>
      <DropDownPicker open={openAnimalDropdown} value={selectedAnimalId} items={animalOptions} setOpen={setOpenAnimalDropdown} setValue={setSelectedAnimalId} setItems={setAnimalOptions} onChangeValue={(v) => handleSelectAnimal(v)} placeholder="Chọn động vật" style={{ backgroundColor: '#f0f0f0', borderColor: '#d0d0d0', borderRadius: 5 }} dropDownContainerStyle={{ backgroundColor: '#f0f0f0', borderColor: '#d0d0d0' }} zIndex={3000} zIndexInverse={1000} />

      <Text className="text-base font-bold mt-5 mb-2.5">Chọn gói chăm sóc</Text>
      <DropDownPicker open={openPackageDropdown} value={selectedPackageId} items={packageOptions} setOpen={setOpenPackageDropdown} setValue={setSelectedPackageId} setItems={setPackageOptions} onChangeValue={(v) => v && handleSelectPackage(v)} placeholder="Chọn gói phù hợp" style={{ backgroundColor: '#f0f0f0', borderColor: '#d0d0d0', borderRadius: 5 }} dropDownContainerStyle={{ backgroundColor: '#f0f0f0', borderColor: '#d0d0d0' }} disabled={!selectedAnimalId} zIndex={2000} zIndexInverse={1000} />

      {selectedPackageDetails ? (
        <View className="flex-row items-center my-5">
          <FontAwesome name="info-circle" size={16} color="#333" />
          <Text className="text-sm text-[#333] ml-2">{selectedPackageDetails}</Text>
        </View>
      ) : null}

      <Text className="text-base font-bold mt-5 mb-2.5">Đặt tên động vật</Text>
      <TextInput className={`bg-[#f0f0f0] rounded-md p-2.5 my-2.5 text-base ${customAnimalName ? 'border-primary' : 'border-[#d0d0d0]'} border`} placeholder="Nhập tên động vật" value={customAnimalName} onChangeText={setCustomAnimalName} />

      <TouchableOpacity className="mt-5 bg-primary py-3 px-5 rounded-[10px] shadow items-center" onPress={handleAddAnimal}>
        <Text className="text-lg text-white font-bold">Thêm động vật</Text>
      </TouchableOpacity>
    </View>
  );
}
