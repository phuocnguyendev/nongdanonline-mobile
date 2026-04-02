import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Placeholder: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#00a86b" />
    </View>
  );
};

export default Placeholder;
