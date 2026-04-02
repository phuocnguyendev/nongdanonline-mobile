import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik, FormikHelpers } from 'formik';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import {
  Alert, Dimensions, Image, ImageBackground, Keyboard, Pressable,
  SafeAreaView, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { postLogin } from '../../api/auth/index';
import CustomButton from '../../components/ui/Button/CustomButton';
import InputField from '../../components/ui/InputField/InputField';
import { setUser } from '../../store/userSlice';
import getLoginValidationSchema from '../../validation/LoginValidation';

interface LoginValues { email: string; password: string; }
interface DecodedToken {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  name: string; sub: string; avatar: string;
}
interface LoginProps { navigation: { navigate: (screen: string) => void }; }

export function Login({ navigation }: LoginProps): React.ReactElement {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = (): void => setChecked(!checked);
  const dismissKeyboard = (): void => Keyboard.dismiss();
  const validation = getLoginValidationSchema();

  const handleLogin = async (values: LoginValues): Promise<void> => {
    try {
      const response = await postLogin(values);
      const { token, refreshToken } = response.data;
      const decodedToken = jwtDecode<DecodedToken>(token);
      const userInfo = {
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        name: decodedToken.name, email: decodedToken.sub, avatar: decodedToken.avatar,
      };
      if (userInfo.role === 'User') {
        await AsyncStorage.setItem('accessToken', token);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        dispatch(setUser(userInfo));
        navigation.navigate('Main Screen');
      } else {
        Alert.alert('Đăng nhập thất bại', 'Tài khoản không hợp lệ');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const { width, height } = Dimensions.get('window');

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-transparent flex-1">
          <View style={{ height: height * 0.4, paddingTop: StatusBar.currentHeight }}>
            <ImageBackground source={require('../../assets/background.png')} className="absolute w-full h-full -z-10" resizeMode="cover" blurRadius={5} />
            <SafeAreaView>
              <Image source={require('../../assets/logo1.png')} style={{ width: width * 0.3, height: height * 0.12, alignSelf: 'center' }} />
            </SafeAreaView>
          </View>
          <View className="px-5 mt-5 justify-center absolute left-0 right-0 flex-1" style={{ top: height * 0.15 }}>
            <View className="p-6 rounded-[20px] bg-white shadow-lg">
              <Formik initialValues={{ email: '', password: '' }} validationSchema={validation} onSubmit={handleLogin}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <InputField label="Email" value={values.email} onChangeText={handleChange('email')} placeholder="thang@gmail.com" onBlur={handleBlur('email')} />
                    {touched.email && errors.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}
                    <InputField label="Password" value={values.password} onChangeText={handleChange('password')} placeholder="Mật khẩu" onBlur={handleBlur('password')} secureTextEntry={!showPassword} toggleVisibility={() => setShowPassword(!showPassword)} />
                    {touched.password && errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}
                    <View className="flex-row items-center justify-between mb-4">
                      <Pressable onPress={toggleCheckbox}><Text>{checked ? '☑️' : '⬜️'} Tự động đăng nhập</Text></Pressable>
                      <Pressable onPress={() => navigation.navigate('Forgot Password')}><Text className="text-sm text-red-500">Quên mật khẩu</Text></Pressable>
                    </View>
                    <CustomButton onPress={handleSubmit} title="Đăng nhập" />
                  </>
                )}
              </Formik>
              <Text className="text-gray-500 text-base text-center">
                Không có tài khoản?{' '}
                <Text onPress={() => navigation.navigate('Register')} className="text-[#2dcc6f] text-base">Đăng ký ngay</Text>
              </Text>
              <View className="flex-row items-center mt-4">
                <View className="flex-1 h-px bg-gray-400" />
                <Text className="mx-2.5 text-gray-500 text-base">or</Text>
                <View className="flex-1 h-px bg-gray-400" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default Login;
