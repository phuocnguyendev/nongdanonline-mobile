import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

interface ContactFormProps {
  onPress: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onPress }) => {
  return (
    <View>
      <View className="my-2.5">
        <Text className="font-bold text-base mb-2.5">Tin nhắn</Text>
        <TextInput
          placeholder="Nhập tin nhắn của bạn"
          className="text-base px-4 py-2.5 border border-[#ddd] rounded-[10px] h-[100px]"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      <TouchableOpacity
        className="mt-5 bg-[#2dcc6f] py-4 rounded-[30px] shadow-lg"
        onPress={onPress}
      >
        <Text className="text-white font-bold text-base text-center">
          Gửi tin nhắn
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactForm;
