import React from 'react';
import { Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconButtonProps {
  icon: string;
  color: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
    >
      <View className="rounded-lg p-1.5 mx-4 my-0.5 border border-green-600 bg-[#f6f6f6]">
        <Ionicons name={icon} size={24} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;
