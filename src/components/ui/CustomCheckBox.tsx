import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  image: ImageSourcePropType;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onPress,
  image,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center w-full p-1.5 border rounded-[15px] mb-2.5 ${
        checked ? 'bg-[#f8fcfd] border-green-600' : 'bg-white border-[#ccc]'
      }`}
      onPress={onPress}
    >
      <Image source={image} className="w-10 h-10 mr-2.5" />
      <View className="flex-row items-center justify-between w-4/5">
        <Text className="ml-2.5 text-base">{label}</Text>
        <View
          className={`w-6 h-6 border-2 rounded justify-center items-center ${
            checked ? 'border-green-600' : 'border-[#ccc]'
          }`}
        >
          {checked && <FontAwesome5 name="check" size={16} color="green" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
