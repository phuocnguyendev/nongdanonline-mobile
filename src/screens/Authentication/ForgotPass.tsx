import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, Keyboard, Modal, StatusBar, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { postForgotPass } from '../../api/auth/index';

export function ForgotPass(): React.ReactElement {
  const headerHeight = useHeaderHeight();
  const dismissKeyboard = (): void => Keyboard.dismiss();
  const [inputFocused, setInputFocused] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalFailVisible, setModalFailVisible] = useState(false);

  const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const handleChangeEmail = (value: string): void => { setEmail(value); setIsValidEmail(validateEmail(value)); };
  const handleSend = async (): Promise<void> => {
    try { await postForgotPass({ email: email! }); setModalSuccessVisible(true); }
    catch (error) { setModalFailVisible(true); console.error('Error:', error); }
  };
  const closeModal = (): void => { setModalSuccessVisible(false); setModalFailVisible(false); };
  const { width, height } = Dimensions.get('window');

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground source={require('../../assets/background2.png')} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, width, height: height + (StatusBar.currentHeight || 0) }} resizeMode="cover">
        <View className="flex-1 px-10" style={{ paddingTop: headerHeight + 100 }}>
          <View className="mb-5">
            <Text className={`font-bold text-base ${inputFocused === 'email' ? 'text-[#4caf50]' : 'text-[#333]'}`}>Email</Text>
            <View className={`border-b flex-row items-center justify-between ${inputFocused === 'email' ? 'border-[#4caf50]' : 'border-[#333]'}`}>
              <TextInput placeholder="john.doe@gmail.com" onChangeText={handleChangeEmail} className="p-0.5 flex-1" onFocus={() => setInputFocused('email')} onBlur={() => setInputFocused(null)} />
            </View>
            {email && !isValidEmail ? <Text className="text-red-500 mt-1">Email không hợp lệ</Text> : null}
          </View>
          <TouchableOpacity className={`rounded-[20px] py-4 shadow ${isValidEmail ? 'bg-[#4caf50]' : 'bg-[#ddd]'}`} onPress={handleSend} disabled={!isValidEmail}>
            <Text className="text-center text-base text-white font-bold">Gửi</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="fade" transparent visible={modalSuccessVisible} onRequestClose={closeModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-5 bg-white rounded-[10px] items-center border-2 border-[#4caf50]">
              <Ionicons name="checkmark-circle" size={64} color="#4caf50" />
              <Text className="text-[22px] font-bold my-2.5 text-[#4caf50]">Thành công!</Text>
              <Text className="text-base leading-6 text-center mb-5">Email khôi phục mật khẩu đã được gửi.</Text>
              <TouchableOpacity className="p-2.5 rounded-md w-full items-center bg-[#4caf50]" onPress={closeModal}><Text className="text-white font-bold">Đã hiểu</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal animationType="fade" transparent visible={modalFailVisible} onRequestClose={closeModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-5 bg-white rounded-[10px] items-center border-2 border-[#f44336]">
              <Ionicons name="close-circle" size={64} color="#f44336" />
              <Text className="text-[22px] font-bold my-2.5 text-[#f44336]">Thất bại!</Text>
              <Text className="text-base leading-6 text-center mb-5">Không thể gửi email. Vui lòng thử lại sau.</Text>
              <TouchableOpacity className="p-2.5 rounded-md w-full items-center bg-[#f44336]" onPress={closeModal}><Text className="text-white font-bold">Đã hiểu</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default ForgotPass;
