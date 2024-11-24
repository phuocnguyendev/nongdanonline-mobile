import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import Placeholder from '../../components/app/lazyPlaceholder'
import {
  AddressScreen,
  Info,
  ShippingHistory,
  UpdatePassword,
} from '../../screens/user/profile'
import InvoiceNavigation from './invoiceNavigation'

const Tab = createMaterialTopTabNavigator()

export default function ProfileNavigation({}) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Placeholder />,
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: '#00a86b',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: {
          backgroundColor: '#00a86b',
        },
        initialRouteName: 'Info',
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: '#7affcf',
      }}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        options={{ tabBarLabel: 'Hồ sơ' }}
      />
      <Tab.Screen
        name="Address"
        component={AddressScreen}
        options={{ tabBarLabel: 'Địa chỉ' }}
      />
      <Tab.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{ tabBarLabel: 'Mật khẩu' }}
      />
      <Tab.Screen
        name="DeliveryOrder"
        component={ShippingHistory}
        options={{ tabBarLabel: 'Đơn giao hàng' }}
      />
      <Tab.Screen
        name="InvoiceNavigation"
        component={InvoiceNavigation}
        options={{ tabBarLabel: 'Đơn mua' }}
      />
    </Tab.Navigator>
  )
}
