import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { changeUserPassword } from '../../../api/user/user';
import { updatePasswordValidationSchema } from '../../../validation/Validation';

export const UpdatePassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async (): Promise<void> => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) { Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.'); return; }
        const decodedToken: any = jwtDecode(token);
        const id = decodedToken.id || decodedToken.sub || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        if (id) { setUserId(id); } else { Alert.alert('Lỗi', 'Token không hợp lệ.'); }
      } catch (error) { console.error('Error decoding token:', error); Alert.alert('Lỗi', 'Không thể đọc thông tin người dùng.'); }
    };
    fetchUserId();
  }, []);

  const formik = useFormik({
    initialValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    validationSchema: updatePasswordValidationSchema,
    onSubmit: async (values) => {
      if (!userId) { Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.'); return; }
      setIsLoading(true);
      try {
        const response: any = await changeUserPassword(userId, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });
        if (response.statusCode === 200) {
          Alert.alert('Thành công', 'Cập nhật mật khẩu thành công');
          formik.resetForm();
        } else {
          Alert.alert('Lỗi', response.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
      } finally { setIsLoading(false); }
    },
  });

  return (
    <View className="flex-1 bg-[#f3f8fd] px-5 pt-10 justify-start">
      <Text className="text-[22px] font-bold text-center mb-5 text-[#333]">Cập Nhật Mật Khẩu</Text>
      <View className="bg-white rounded-[15px] p-5 shadow-lg elevation-[8]">
        <View className="mb-5">
          <Text className="text-sm text-[#4a4a4a] font-semibold mb-2">Mật khẩu hiện tại</Text>
          <TextInput
            className={`bg-[#f9fafe] border border-[#d1d9e6] rounded-[10px] p-3 text-sm ${formik.touched.currentPassword && formik.errors.currentPassword ? 'border-[#f05252]' : ''}`}
            placeholder="Nhập mật khẩu hiện tại"
            secureTextEntry
            onChangeText={formik.handleChange('currentPassword')}
            onBlur={formik.handleBlur('currentPassword')}
            value={formik.values.currentPassword}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && <Text className="text-[#f05252] text-xs mt-1">{formik.errors.currentPassword as string}</Text>}
        </View>

        <View className="mb-5">
          <Text className="text-sm text-[#4a4a4a] font-semibold mb-2">Mật khẩu mới</Text>
          <TextInput
            className={`bg-[#f9fafe] border border-[#d1d9e6] rounded-[10px] p-3 text-sm ${formik.touched.newPassword && formik.errors.newPassword ? 'border-[#f05252]' : ''}`}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && <Text className="text-[#f05252] text-xs mt-1">{formik.errors.newPassword as string}</Text>}
        </View>

        <View className="mb-5">
          <Text className="text-sm text-[#4a4a4a] font-semibold mb-2">Xác nhận mật khẩu mới</Text>
          <TextInput
            className={`bg-[#f9fafe] border border-[#d1d9e6] rounded-[10px] p-3 text-sm ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-[#f05252]' : ''}`}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <Text className="text-[#f05252] text-xs mt-1">{formik.errors.confirmPassword as string}</Text>}
        </View>

        <TouchableOpacity className={`bg-[#00a86b] py-[15px] rounded-xl items-center mt-2.5 shadow-md elevation-2 ${isLoading ? 'bg-[#d1d9e6]' : ''}`} onPress={() => formik.handleSubmit()} disabled={isLoading}>
          {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white text-base font-bold">Cập Nhật Mật Khẩu</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdatePassword;
