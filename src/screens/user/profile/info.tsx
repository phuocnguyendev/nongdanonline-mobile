import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { getUserInfo, updateUserID, uploadUserAvatar } from '../../../api/user/user';

export function Info(): React.ReactElement {
  const [userData, setUserData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchUserInfo = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return;
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id || decodedToken.sub || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const response = await getUserInfo(userId);
      setUserData(response.data);
      setSelectedImage(response.data.avatar);
    } catch (error) { console.error('Lỗi khi tải thông tin user:', error); }
    finally { setIsFetching(false); }
  };

  useEffect(() => { fetchUserInfo(); }, []);

  const handleSave = async (): Promise<void> => {
    if (!userData?.id) return;
    setIsSaving(true);
    const phoneNumberPattern = /^0\d{9}$/;
    if (!phoneNumberPattern.test(userData.phoneNumber)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ. Vui lòng nhập lại.');
      setIsSaving(false); return;
    }
    const updateProfilePromise = updateUserID(userData.id, { name: userData.name, phoneNumber: userData.phoneNumber });
    let uploadAvatarPromise: Promise<any> = Promise.resolve();
    if (selectedImage && selectedImage !== userData.avatar) {
      const formData = new FormData();
      formData.append('avatarFile', { uri: selectedImage, name: 'avatar.jpg', type: 'image/jpeg' } as any);
      uploadAvatarPromise = uploadUserAvatar(userData.id, formData);
    }
    try {
      const [updateProfileResponse, uploadAvatarResponse] = await Promise.all([updateProfilePromise, uploadAvatarPromise]);
      if (updateProfileResponse?.statusCode === 200) {
        setUserData(updateProfileResponse.data);
        Alert.alert('Thành công', 'Cập nhật thông tin người dùng thành công.');
      }
      if (uploadAvatarResponse?.statusCode === 200) {
        setUserData((prev: any) => ({ ...prev, avatar: uploadAvatarResponse.data.avatar }));
      }
    } catch (error) { console.error('Error updating user info:', error); Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật thông tin.'); }
    finally { setIsSaving(false); }
  };

  const openImagePicker = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 1, selectionLimit: 1 });
      if (result.didCancel) { setLoading(false); return; }
      if (result.errorCode) {
        Alert.alert('Lỗi', 'Không thể mở thư viện ảnh.'); setLoading(false); return;
      }
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.fileSize && asset.fileSize > 1 * 1024 * 1024) {
          Alert.alert('Lỗi', 'Kích thước file phải nhỏ hơn 1MB.'); setLoading(false); return;
        }
        if (asset.uri) { setSelectedImage(asset.uri); }
      }
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  if (isFetching) { return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#16a34a" /></View>; }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#f4f4f4', justifyContent: 'center' }}>
      <View className="bg-white rounded-xl p-5 shadow-sm elevation-[5] items-center">
        <Text className="text-2xl font-bold mb-2.5 text-center text-[#333]">Hồ sơ của tôi</Text>
        <Text className="text-base text-center mb-5 text-[#555]">Quản lí thông tin hồ sơ để bảo mật tài khoản</Text>

        <View className="w-full mb-5">
          <View className="flex-row items-center mb-[15px]">
            <Text className="text-base font-bold w-[30%] text-[#333]">Tên</Text>
            <TextInput className="border border-[#ccc] py-1.5 px-2.5 rounded-lg flex-1 text-base bg-[#fafafa]" value={userData?.name || ''} onChangeText={(text) => setUserData((prev: any) => ({ ...prev, name: text }))} placeholder="Nhập tên của bạn" />
          </View>
          <View className="flex-row items-center mb-[15px]">
            <Text className="text-base font-bold w-[30%] text-[#333]">Email</Text>
            <Text className="text-blue-600 font-bold text-base flex-1">{userData?.email || ''}</Text>
          </View>
          <View className="flex-row items-center mb-[15px]">
            <Text className="text-base font-bold w-[30%] text-[#333]">Số điện thoại</Text>
            <TextInput className="border border-[#ccc] py-1.5 px-2.5 rounded-lg flex-1 text-base bg-[#fafafa]" value={userData?.phoneNumber || ''} onChangeText={(text) => setUserData((prev: any) => ({ ...prev, phoneNumber: text }))} keyboardType="phone-pad" placeholder="Nhập số điện thoại của bạn" />
          </View>
        </View>

        <View className="items-center justify-center w-full">
          {loading ? (
            <ActivityIndicator size="large" color="#16a34a" />
          ) : (
            <>
              {selectedImage ? <Image source={{ uri: selectedImage }} className="w-[100px] h-[100px] rounded-full my-5 border-2 border-[#00a86b]" /> : <View className="w-[100px] h-[100px] rounded-full my-5 border-2 border-[#00a86b] bg-gray-200" />}
              <TouchableOpacity className="bg-[#1d4ed8] py-3 px-5 rounded-lg my-2.5" onPress={openImagePicker}>
                <Text className="text-white text-base font-bold text-center">Chọn Ảnh</Text>
              </TouchableOpacity>
              <Text className="text-sm text-[#555] text-center mb-1">Dung lượng file tối đa 1Mb</Text>
              <Text className="text-sm text-[#555] text-center mb-1">Định dạng: JPEG, PNG.</Text>
              <TouchableOpacity className="bg-[#00a86b] py-3 px-5 rounded-lg my-2.5 w-1/2 items-center" onPress={handleSave}>
                <Text className="text-white text-base font-bold text-center">{isSaving ? 'Đang lưu...' : 'Lưu'}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default Info;
