import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
// import { CartProvider } from '../reducers/CartContext'
import DrawerNavigation from './drawer/drawerNavigation'
import ListFarmNavigation from './stack/listFarmNavigation'
import LoginNavigation from './stack/loginNavigation'

const Stack = createStackNavigator()

export function Navigator() {
  return (
    <NavigationContainer>
      {/* <CartProvider> */}
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
        {/* <Stack.Screen
            name={ShoppingCart}
            component={ShoppingCart}
            options={{
              title: 'Giỏ hàng',
              headerStyle: {
                backgroundColor: '#00a86b',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
            }}
          /> */}
      </Stack.Navigator>
      {/* </CartProvider> */}
    </NavigationContainer>
  )
}
