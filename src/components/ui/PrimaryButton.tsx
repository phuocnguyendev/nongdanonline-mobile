import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onPress }) => {
  return (
    <View className="rounded-[28px] m-1 overflow-hidden">
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.75 }]}
        className="bg-primary rounded-[14px] mx-1 py-2 px-3 shadow border border-primary"
        onPress={onPress}
        android_ripple={{ color: '#729c69' }}
      >
        <Text className="text-[15px] text-white text-center font-bold">
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;
