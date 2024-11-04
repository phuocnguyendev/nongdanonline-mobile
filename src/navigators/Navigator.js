import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { CartProvider } from '../reducers/CartContext'
import {
  WrappedDrawerNavigation,
  WrappedLoginNavigation,
  WrappedShoppingCart,
} from './WrappedScreens'
import { LOGIN_SCREEN, MAIN_SCREEN, SHOPPING_CART_SCREEN } from './screenNames'

const Stack = createStackNavigator()

export function Navigator() {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen
            name={LOGIN_SCREEN}
            component={WrappedLoginNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={MAIN_SCREEN}
            component={WrappedDrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={SHOPPING_CART_SCREEN}
            component={WrappedShoppingCart}
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
          />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  )
}
