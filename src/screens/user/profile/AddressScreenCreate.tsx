import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAddress } from '../../../api/address/address';
import { postUserAddress } from '../../../api/user/user';

interface AddressScreenCreateProps {
  navigation: { goBack: () => void };
  route: { params?: { refreshData?: () => void } };
}

const AddressScreenCreate: React.FC<AddressScreenCreateProps> = ({ navigation, route }) => {
  const { refreshData } = route.params || {};
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', isDefault: false });
  const [loading, setLoading] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);

  useEffect(() => {
    const fetchProvinces = async (): Promise<void> => {
      try {
        const response = await getAddress();
        const provinceOptions = response.data.map((province: any) => ({ label: province.Name, value: province.Id, districts: province.Districts }));
        setProvinces(provinceOptions);
      } catch (error) { console.error('Error fetching provinces:', error); }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = (selectedOption: any): void => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts(selectedOption ? selectedOption.districts.map((district: any) => ({ value: district.Id, label: district.Name, wards: district.Wards })) : []);
  };

  const handleDistrictChange = (selectedOption: any): void => {
    setSelectedDistrict(selectedOption);
    setSelectedWard(null);
    setWards(selectedOption ? selectedOption.wards.map((ward: any) => ({ label: ward.Name, value: ward.Id })) : []);
  };

  const handleWardChange = (selectedOption: any): void => { setSelectedWard(selectedOption); };

  const handleSubmit = async (): Promise<void> => {
    const { name, phone, address, isDefault } = formData;
    if (!name || !phone || !address || !selectedProvince || !selectedDistrict || !selectedWard) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }
    const fullAddress = `${address}, ${selectedWard.label}, ${selectedDistrict.label}, ${selectedProvince.label}`;
    setLoading(true);
    try {
      await postUserAddress({ name, phone, address: fullAddress, isdefault: isDefault });
      Alert.alert('Thành công', 'Địa chỉ mới đã được thêm.');
      if (refreshData) refreshData();
      navigation.goBack();
    } catch (error) {
      console.error('Error creating address:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm địa chỉ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#f4f4f4] p-[20px]">
      <Text className="text-xl font-bold text-center mb-[20px]">Địa chỉ mới</Text>

      <View className="mb-[15px]">
        <Text className="text-sm mb-[5px] text-[#555]">Họ và tên</Text>
        <TextInput className="bg-white border border-[#ddd] rounded-lg p-2.5 text-sm" placeholder="Nhập họ và tên" value={formData.name} onChangeText={(text) => setFormData({ ...formData, name: text })} />
      </View>

      <View className="mb-[15px]">
        <Text className="text-sm mb-[5px] text-[#555]">Số điện thoại</Text>
        <TextInput className="bg-white border border-[#ddd] rounded-lg p-2.5 text-sm" placeholder="Nhập số điện thoại" keyboardType="phone-pad" value={formData.phone} onChangeText={(text) => setFormData({ ...formData, phone: text })} />
      </View>

      <View className="mb-[15px]">
        <Text className="text-sm mb-[5px] text-[#555]">Tỉnh/Thành phố</Text>
        <DropDownPicker style={{ backgroundColor: 'white', borderColor: '#ddd', borderRadius: 8 }} dropDownContainerStyle={{ borderColor: '#ddd' }} placeholder="Chọn Tỉnh/Thành phố" items={provinces} value={selectedProvince?.value || null} setValue={(callback) => { const value = callback(selectedProvince?.value); const selectedOption = provinces.find((p) => p.value === value); handleProvinceChange(selectedOption); }} setOpen={setOpenProvince} open={openProvince} zIndex={3000} zIndexInverse={1000} />
      </View>

      <View className="mb-[15px]">
        <Text className="text-sm mb-[5px] text-[#555]">Quận/Huyện</Text>
        <DropDownPicker style={{ backgroundColor: 'white', borderColor: '#ddd', borderRadius: 8 }} dropDownContainerStyle={{ borderColor: '#ddd' }} placeholder="Chọn Quận/Huyện" items={districts} value={selectedDistrict?.value || null} setValue={(callback) => { const value = callback(selectedDistrict?.value); const selectedOption = districts.find((d) => d.value === value); handleDistrictChange(selectedOption); }} setOpen={setOpenDistrict} open={openDistrict} zIndex={2000} zIndexInverse={2000} disabled={!selectedProvince} />
      </View>

      <View className="mb-[15px]">
        <Text className="text-sm mb-[5px] text-[#555]">Phường/Xã</Text>
        <DropDownPicker style={{ backgroundColor: 'white', borderColor: '#ddd', borderRadius: 8 }} dropDownContainerStyle={{ borderColor: '#ddd' }} placeholder="Chọn Phường/Xã" items={wards} value={selectedWard?.value || null} setValue={(callback) => { const value = callback(selectedWard?.value); const selectedOption = wards.find((w) => w.value === value); handleWardChange(selectedOption); }} setOpen={setOpenWard} open={openWard} zIndex={1000} zIndexInverse={3000} disabled={!selectedDistrict} />
      </View>

      <View className="mb-[15px]">
        <Text className="text-sm mb-[5px] text-[#555]">Địa chỉ cụ thể</Text>
        <TextInput className="bg-white border border-[#ddd] rounded-lg p-2.5 text-sm" placeholder="Nhập địa chỉ cụ thể" value={formData.address} onChangeText={(text) => setFormData({ ...formData, address: text })} />
      </View>

      <View className="mb-[15px]">
        <TouchableOpacity onPress={() => setFormData((prev) => ({ ...prev, isDefault: !prev.isDefault }))}>
          <Text className="text-sm text-[#333]">{formData.isDefault ? '☑' : '☐'} Đặt làm địa chỉ mặc định</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className={`bg-[#00a86b] py-3 rounded-lg items-center ${loading ? 'opacity-70' : ''}`} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white font-bold text-base">Hoàn thành</Text>}
      </TouchableOpacity>
      <View className="h-10" />
    </ScrollView>
  );
};

export default AddressScreenCreate;
