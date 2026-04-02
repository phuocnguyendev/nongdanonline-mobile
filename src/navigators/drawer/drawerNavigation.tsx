import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { AboutNavigation, ContactNavigation, InfoNavigation } from '../stack';
import { TabNavigation } from '../tab';
import type { RootState } from '../../store/store';

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  userName?: string;
  userImage?: string;
}

function CustomDrawerContent(props: CustomDrawerContentProps): React.ReactElement {
  const { userName, userImage, navigation } = props;
  const handleLogout = (): void => {
    navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <TouchableOpacity
        className="bg-[#2ecc71]"
        onPress={() => navigation.navigate('Info')}
      >
        <ImageBackground
          source={require('../../assets/background_user.jpg')}
          className="py-4 px-2.5"
          resizeMode="cover"
        >
          <View className="flex-row items-center mb-2.5">
            <Image source={{ uri: userImage }} className="w-10 h-10 rounded-full" />
            <Text className="text-lg font-bold text-white ml-2.5">{userName}</Text>
          </View>
          <Text className="text-base text-white">Xem thông tin cá nhân</Text>
        </ImageBackground>
      </TouchableOpacity>

      <View className="flex-1 bg-white pt-2.5">
        <DrawerItemList {...props} />
      </View>

      <TouchableOpacity
        className="p-5 border-t border-[#e3e3e3] flex-row items-center"
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
        <Text className="text-base font-bold text-[#e74c3c] text-center ml-2.5">Đăng xuất</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator(): React.ReactElement {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Drawer.Navigator
      initialRouteName="HomeTab"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userName={userInfo?.name}
          userImage={userInfo?.avatar}
        />
      )}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        gestureEnabled: true,
        drawerPosition: 'left',
        drawerActiveBackgroundColor: '#e0ffe1',
        drawerActiveTintColor: '#347928',
        drawerInactiveTintColor: '#347928',
      }}
    >
      <Drawer.Screen name="HomeTab" component={TabNavigation} options={{ drawerLabel: 'Trang chủ', unmountOnBlur: true }} />
      <Drawer.Screen name="Info" component={InfoNavigation} options={{ drawerItemStyle: { display: 'none' }, unmountOnBlur: true }} />
      <Drawer.Screen name="Contact" component={ContactNavigation} options={{ drawerLabel: 'Liên hệ', unmountOnBlur: true }} />
      <Drawer.Screen name="About" component={AboutNavigation} options={{ drawerLabel: 'Về chúng tôi', unmountOnBlur: true }} />
    </Drawer.Navigator>
  );
}
