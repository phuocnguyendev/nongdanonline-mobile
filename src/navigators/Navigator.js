import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Camera from '../screens/homeTab/InfoAnimal/Camera'
import Sensor from '../screens/homeTab/InfoAnimal/Sensor'
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
