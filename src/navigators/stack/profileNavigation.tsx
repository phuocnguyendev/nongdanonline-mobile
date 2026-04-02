import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Placeholder from '../../components/app/lazyPlaceholder';
import { AddressScreen, Info, ShippingHistory, UpdatePassword } from '../../screens/user/profile';
import AnimalHistory from '../../screens/user/profile/AnimalHistory';
import InvoiceNavigation from './invoiceNavigation';

const Tab = createMaterialTopTabNavigator();

export default function ProfileNavigation(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Placeholder />,
        tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold', textTransform: 'capitalize' },
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: '#BDC3C7',
        tabBarIndicatorStyle: { backgroundColor: '#00A86B', height: 3 },
        tabBarStyle: { backgroundColor: '#FFFFFF', elevation: 4 },
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: '#E8F5E9',
      }}
    >
      <Tab.Screen name="Info" component={Info} options={{ tabBarLabel: 'Hồ sơ' }} />
      <Tab.Screen name="Address" component={AddressScreen} options={{ tabBarLabel: 'Địa chỉ' }} />
      <Tab.Screen name="UpdatePassword" component={UpdatePassword} options={{ tabBarLabel: 'Mật khẩu' }} />
      <Tab.Screen name="DeliveryOrder" component={ShippingHistory} options={{ tabBarLabel: 'Đơn giao hàng' }} />
      <Tab.Screen name="InvoiceNavigation" component={InvoiceNavigation} options={{ tabBarLabel: 'Đơn mua' }} />
      <Tab.Screen name="AnimalHistory" component={AnimalHistory} options={{ tabBarLabel: 'Lịch sử chăn nuôi' }} />
    </Tab.Navigator>
  );
}
