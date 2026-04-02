import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  backgroundColor = '#2dcc6f',
  textColor = 'white',
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[{ backgroundColor }, style]}
      className={`py-4 rounded-[30px] mb-5 shadow-lg ${disabled ? 'bg-[#cccccc]' : ''}`}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={{ color: textColor }} className="font-bold text-base text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
