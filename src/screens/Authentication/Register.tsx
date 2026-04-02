import { useFormik } from 'formik';
import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { postRegister } from '../../api/auth/auth';
import { signUpValidationSchema } from '../../validation/Validation';

interface RegisterProps { navigation: { navigate: (screen: string) => void }; }

export const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', phoneNumber: '' },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await postRegister({
          name: values.name, email: values.email, password: values.password,
          confirmPassword: values.confirmPassword, phoneNumber: values.phoneNumber,
        });
        if (response?.statusCode === 200) {
          Toast.show({ type: 'success', text1: 'Đăng ký thành công!', text2: 'Vui lòng kiểm tra email để xác nhận.' });
          setTimeout(() => navigation.navigate('Login'), 2000);
        } else {
          Toast.show({ type: 'error', text1: 'Lỗi đăng ký', text2: response?.message || 'Đăng ký không thành công.' });
        }
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        Toast.show({ type: 'error', text1: 'Lỗi hệ thống', text2: err.response?.data?.message || 'Đã xảy ra lỗi.' });
      }
    },
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6', padding: 16 }}>
      <View className="w-full max-w-[400px] bg-white rounded-lg p-5 shadow-lg">
        <Text className="text-2xl font-bold text-[#333] mb-2">Đăng ký</Text>
        <Text className="text-sm text-[#555] mb-4">Chúng tôi sẽ thiết lập mọi thứ để bạn có thể truy cập vào tài khoản cá nhân của mình.</Text>

        <TextInput className="border border-[#ddd] rounded-lg p-3 mb-3 text-base bg-[#f9f9f9]" placeholder="Họ và tên" value={formik.values.name} onChangeText={formik.handleChange('name')} onBlur={formik.handleBlur('name')} />
        {formik.touched.name && formik.errors.name && <Text className="text-red-500 text-xs mb-2">{formik.errors.name}</Text>}

        <TextInput className="border border-[#ddd] rounded-lg p-3 mb-3 text-base bg-[#f9f9f9]" placeholder="Email" value={formik.values.email} onChangeText={formik.handleChange('email')} onBlur={formik.handleBlur('email')} keyboardType="email-address" />
        {formik.touched.email && formik.errors.email && <Text className="text-red-500 text-xs mb-2">{formik.errors.email}</Text>}

        <TextInput className="border border-[#ddd] rounded-lg p-3 mb-3 text-base bg-[#f9f9f9]" placeholder="Số điện thoại" value={formik.values.phoneNumber} onChangeText={formik.handleChange('phoneNumber')} onBlur={formik.handleBlur('phoneNumber')} keyboardType="phone-pad" />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && <Text className="text-red-500 text-xs mb-2">{formik.errors.phoneNumber}</Text>}

        <TextInput className="border border-[#ddd] rounded-lg p-3 mb-3 text-base bg-[#f9f9f9]" placeholder="Mật khẩu" value={formik.values.password} onChangeText={formik.handleChange('password')} onBlur={formik.handleBlur('password')} secureTextEntry />
        {formik.touched.password && formik.errors.password && <Text className="text-red-500 text-xs mb-2">{formik.errors.password}</Text>}

        <TextInput className="border border-[#ddd] rounded-lg p-3 mb-3 text-base bg-[#f9f9f9]" placeholder="Xác nhận mật khẩu" value={formik.values.confirmPassword} onChangeText={formik.handleChange('confirmPassword')} onBlur={formik.handleBlur('confirmPassword')} secureTextEntry />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && <Text className="text-red-500 text-xs mb-2">{formik.errors.confirmPassword}</Text>}

        <TouchableOpacity className="py-3 rounded-lg items-center bg-[#34d399]" onPress={() => formik.handleSubmit()}>
          <Text className="text-white text-base font-bold">Đăng ký</Text>
        </TouchableOpacity>
        <Text className="text-center mt-4 text-[#555]">
          Bạn đã có tài khoản?{' '}<Text className="text-[#34d399] font-bold" onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>
        </Text>
      </View>
      <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2Ffarm_1.gif?alt=media&token=f14f9a0f-cda3-42cf-9701-56c613cf6e79' }} className="w-full h-[200px] mt-5" />
    </ScrollView>
  );
};

export default Register;
