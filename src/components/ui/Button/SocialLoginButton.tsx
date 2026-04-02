import React from 'react';
import { TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';

interface SocialLoginButtonProps {
  onPress: () => void;
  icon: ImageSourcePropType;
  title: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  onPress,
  icon,
  title,
}) => (
  <TouchableOpacity
    className="flex-row items-center justify-center bg-white py-4 my-2.5 rounded-[30px] shadow-lg border border-[#eee]"
    onPress={onPress}
  >
    <Image source={icon} className="w-6 h-6" />
    <Text className="text-base font-bold ml-2.5">{title}</Text>
  </TouchableOpacity>
);

export default SocialLoginButton;
