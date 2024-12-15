import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import Placeholder from '../../components/app/lazyPlaceholder'
import {
  AddressScreen,
  Info,
  ShippingHistory,
  UpdatePassword,
} from '../../screens/user/profile'
import AnimalHistory from '../../screens/user/profile/AnimalHistory'
import InvoiceNavigation from './invoiceNavigation'

const Tab = createMaterialTopTabNavigator()

export default function ProfileNavigation({}) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Placeholder />,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        },
        tabBarActiveTintColor: '#00A86B', // Emerald green for active tab
        tabBarInactiveTintColor: '#BDC3C7', // Soft gray for inactive tab
        tabBarIndicatorStyle: {
          backgroundColor: '#00A86B', // Match the active tint color
          height: 3, // Slightly thicker indicator for better visibility
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // White background for contrast
          elevation: 4, // Add shadow for better appearance
        },
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: '#E8F5E9', // Light green ripple effect
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
      <Tab.Screen
        name="AnimalHistory"
        component={AnimalHistory}
        options={{ tabBarLabel: 'Lịch sử chăn nuôi' }}
      />
    </Tab.Navigator>
  )
}
