import React from 'react';
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import ContactForm from '../../components/app/ContactForm';

export function Contact(): React.ReactElement {
  const dismissKeyboard = (): void => Keyboard.dismiss();
  const handleSubmit = (): void => {
    alert('Gửi tin nhắn thành công');
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-8">
          <Text className="text-center text-[32px] font-bold text-primary mb-5">Liên Hệ Chúng Tôi</Text>
          <Text className="mt-2.5 text-center text-base">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi bất cứ lúc nào.
          </Text>
          <View className="mt-5 px-5 py-8 bg-white rounded-[10px] shadow-lg">
            <ContactForm onPress={handleSubmit} />
          </View>
          <View className="my-8 items-center">
            <Text className="text-base mb-2.5">Hoặc bạn có thể liên hệ trực tiếp qua:</Text>
            <Text className="text-base font-bold">Hotline: 0378552586</Text>
            <Text className="text-base font-bold">Email: nongdanonline@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
