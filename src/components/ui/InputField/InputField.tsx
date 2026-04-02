import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  secureTextEntry?: boolean;
  toggleVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  isFocused,
  onFocus,
  onBlur,
  secureTextEntry,
  toggleVisibility,
}) => (
  <View className="mb-5">
    <Text
      className={`text-base font-bold ${isFocused ? 'text-[#4caf50]' : 'text-[#333]'}`}
    >
      {label}
    </Text>
    <View
      className={`border-b flex-row items-center ${
        isFocused ? 'border-b-[#4caf50]' : 'border-b-[#333]'
      }`}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="p-0.5 flex-1"
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
      {toggleVisibility && (
        <TouchableOpacity onPress={toggleVisibility} className="justify-end">
          <Ionicons
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#4caf50"
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default InputField;
