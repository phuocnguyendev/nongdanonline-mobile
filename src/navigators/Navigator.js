import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AnimalHealth from '../screens/homeTab/AnimalHealth'
import Checkout from '../screens/homeTab/Checkout'
import Camera from '../screens/homeTab/InfoAnimal/Camera'
import Sensor from '../screens/homeTab/InfoAnimal/Sensor'
import QRCodeScreen from '../screens/homeTab/QRCodeScreen'
import AddressScreenCreate from '../screens/user/profile/AddressScreenCreate'
import UpdateAddressPopup from '../screens/user/profile/UpdateAddressPopup'
import DrawerNavigation from './drawer/drawerNavigation'
import ListFarmNavigation from './stack/listFarmNavigation'
import LoginNavigation from './stack/loginNavigation'
const Stack = createStackNavigator()

export function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen
          name={'Login Navigation'}
          component={LoginNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Main Screen'}
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Farms List'}
          component={ListFarmNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'Camera'} component={Camera} />
        <Stack.Screen
          name={'Sensor'}
          component={Sensor}
          options={{
            title: 'Dữ liệu cảm biến',
            headerStyle: { backgroundColor: '#00a86b' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={'Checkout'}
          component={Checkout}
          options={{
            title: 'Thanh Toán',
            headerStyle: { backgroundColor: '#00a86b' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddressScreenCreate}
          options={{ title: 'Thêm địa chỉ' }}
        />
        <Stack.Screen
          name="UpdateAddress"
          component={UpdateAddressPopup}
          options={{ title: 'Cập nhật địa chỉ' }}
        />
        <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
        <Stack.Screen
          name="AnimalHealth"
          component={AnimalHealth}
          options={{ title: 'Sổ Theo Dõi Sức Khỏe' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
