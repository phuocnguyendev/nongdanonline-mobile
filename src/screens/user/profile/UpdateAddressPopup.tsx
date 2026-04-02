import { useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAddress } from '../../../api/address/address';
import { updateUserAddress } from '../../../api/user/user';
import { updateProfileValidationSchema } from '../../../validation/Validation';

interface UpdateAddressPopupProps {
  closeModal?: () => void;
  navigation: { goBack: () => void };
}

const UpdateAddressPopup: React.FC<UpdateAddressPopupProps> = ({ closeModal, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const route = useRoute<any>();
  const address = route.params?.address || {};
  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const { refreshData } = route.params || {};

  useEffect(() => {
    const fetchProvinces = async (): Promise<void> => {
      try {
        const response = await getAddress();
        const provinceOptions = response.data.map((province: any) => ({
          label: province.Name, value: province.Id, districts: province.Districts,
        }));
        setProvinces(provinceOptions);

        if (address.address) {
          const province = provinceOptions.find((p: any) => address.address.includes(p.label));
          if (province) {
            setSelectedProvince(province);
            const districtOptions = province.districts.map((district: any) => ({ label: district.Name, value: district.Id, wards: district.Wards }));
            setDistricts(districtOptions);
            const district = districtOptions.find((d: any) => address.address.includes(d.label));
            if (district) {
              setSelectedDistrict(district);
              const wardOptions = district.wards.map((ward: any) => ({ label: ward.Name, value: ward.Id }));
              setWards(wardOptions);
              const ward = wardOptions.find((w: any) => address.address.includes(w.label));
              if (ward) setSelectedWard(ward);
            }
          }
        }
      } catch (error) { console.error('Error fetching provinces:', error); }
    };
    fetchProvinces();
  }, [address]);

  const formik = useFormik({
    initialValues: {
      name: address.name || '',
      phone: address.phone || '',
      address: address.address || '',
      isDefault: address.isdefault || false,
    },
    validationSchema: updateProfileValidationSchema,
    onSubmit: async (values) => {
      const fullAddress = `${values.address}, ${selectedWard?.label || ''}, ${selectedDistrict?.label || ''}, ${selectedProvince?.label || ''}`;
      const payload = { ...values, address: fullAddress, isdefault: values.isDefault };
      setLoading(true);
      try {
        await updateUserAddress(address.userAdressId, payload);
        Alert.alert('Thành công', 'Địa chỉ mới đã được cập nhật.');
        if (refreshData) refreshData();
        closeModal ? closeModal() : navigation.goBack();
      } catch (error) {
        console.error('Error updating address:', error);
        Alert.alert('Error', 'Unable to update address. Please try again later.');
      } finally { setLoading(false); }
    },
  });

  const handleProvinceChange = (selectedOption: any): void => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null); setSelectedWard(null);
    setDistricts(selectedOption ? selectedOption.districts.map((d: any) => ({ label: d.Name, value: d.Id, wards: d.Wards })) : []);
  };
  const handleDistrictChange = (selectedOption: any): void => {
    setSelectedDistrict(selectedOption); setSelectedWard(null);
    setWards(selectedOption ? selectedOption.wards.map((w: any) => ({ label: w.Name, value: w.Id })) : []);
  };
  const handleWardChange = (selectedOption: any): void => { setSelectedWard(selectedOption); };

  return (
    <View className="flex-1 bg-white p-[20px]">
      <Text className="text-lg font-bold text-center mb-[20px] text-[#333]">Cập nhật địa chỉ</Text>
      <ScrollView>
        <View className="mb-[15px]">
          <Text className="text-sm text-[#555] mb-1">Họ và tên</Text>
          <TextInput className={`bg-white border border-[#ddd] rounded-lg p-2.5 text-sm ${formik.touched.name && formik.errors.name ? 'border-[#f00]' : ''}`} placeholder="Nhập họ và tên" onChangeText={formik.handleChange('name')} onBlur={formik.handleBlur('name')} value={formik.values.name} />
          {formik.touched.name && formik.errors.name && <Text className="text-[#f00] text-xs mt-1.5">{formik.errors.name as string}</Text>}
        </View>

        <View className="mb-[15px]">
          <Text className="text-sm text-[#555] mb-1">Số điện thoại</Text>
          <TextInput className={`bg-white border border-[#ddd] rounded-lg p-2.5 text-sm ${formik.touched.phone && formik.errors.phone ? 'border-[#f00]' : ''}`} placeholder="Nhập số điện thoại" keyboardType="phone-pad" onChangeText={formik.handleChange('phone')} onBlur={formik.handleBlur('phone')} value={formik.values.phone} />
          {formik.touched.phone && formik.errors.phone && <Text className="text-[#f00] text-xs mt-1.5">{formik.errors.phone as string}</Text>}
        </View>

        <View className="mb-[15px] z-[3000]">
          <Text className="text-sm text-[#555] mb-1">Tỉnh/Thành phố</Text>
          <DropDownPicker open={openProvince} value={selectedProvince?.value} items={provinces} setValue={(cb) => { const v = cb(selectedProvince?.value); handleProvinceChange(provinces.find(p => p.value === v)); }} setOpen={setOpenProvince} placeholder="Chọn Tỉnh/Thành phố" style={{ borderColor: '#ddd', borderRadius: 8, paddingVertical: 8 }} zIndex={3000} zIndexInverse={1000} />
        </View>

        <View className="mb-[15px] z-[2000]">
          <Text className="text-sm text-[#555] mb-1">Quận/Huyện</Text>
          <DropDownPicker open={openDistrict} value={selectedDistrict?.value} items={districts} setValue={(cb) => { const v = cb(selectedDistrict?.value); handleDistrictChange(districts.find(d => d.value === v)); }} setOpen={setOpenDistrict} placeholder="Chọn Quận/Huyện" disabled={!selectedProvince} style={{ borderColor: '#ddd', borderRadius: 8, paddingVertical: 8 }} zIndex={2000} zIndexInverse={2000} />
        </View>

        <View className="mb-[15px] z-[1000]">
          <Text className="text-sm text-[#555] mb-1">Phường/Xã</Text>
          <DropDownPicker open={openWard} value={selectedWard?.value} items={wards} setValue={(cb) => { const v = cb(selectedWard?.value); handleWardChange(wards.find(w => w.value === v)); }} setOpen={setOpenWard} placeholder="Chọn Phường/Xã" disabled={!selectedDistrict} style={{ borderColor: '#ddd', borderRadius: 8, paddingVertical: 8 }} zIndex={1000} zIndexInverse={3000} />
        </View>

        <View className="mb-[15px]">
          <Text className="text-sm text-[#555] mb-1">Địa chỉ cụ thể</Text>
          <TextInput className={`bg-white border border-[#ddd] rounded-lg p-2.5 text-sm ${formik.touched.address && formik.errors.address ? 'border-[#f00]' : ''}`} placeholder="Nhập địa chỉ cụ thể" onChangeText={formik.handleChange('address')} onBlur={formik.handleBlur('address')} value={formik.values.address} />
          {formik.touched.address && formik.errors.address && <Text className="text-[#f00] text-xs mt-1.5">{formik.errors.address as string}</Text>}
        </View>

        <View className="mb-[15px]">
          <TouchableOpacity onPress={() => formik.setFieldValue('isDefault', !formik.values.isDefault)} className="flex-row items-center">
            <Text className="text-sm text-[#333]">{formik.values.isDefault ? '☑' : '☐'} Đặt làm địa chỉ mặc định</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-[20px]">
          <TouchableOpacity onPress={() => { closeModal ? closeModal() : navigation.goBack(); }} className="bg-[#ddd] py-2.5 px-5 rounded-lg flex-1 mr-2 items-center">
            <Text className="text-sm text-[#333]">Đóng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => formik.handleSubmit()} className={`bg-[#00a86b] py-2.5 px-5 rounded-lg flex-1 ml-2 items-center ${loading ? 'opacity-60' : ''}`} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-sm text-white font-bold">Cập nhật</Text>}
          </TouchableOpacity>
        </View>
        <View className="h-[40px]" />
      </ScrollView>
    </View>
  );
};

export default UpdateAddressPopup;
