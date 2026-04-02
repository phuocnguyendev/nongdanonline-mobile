import React from 'react';
import { View } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <View className="flex-1 bg-white">
      <View className="pt-10 pb-2.5 px-5 bg-[#f8f8f8] flex-row justify-end items-center" />
      <View className="flex-1">{children}</View>
    </View>
  );
};

export default Layout;
