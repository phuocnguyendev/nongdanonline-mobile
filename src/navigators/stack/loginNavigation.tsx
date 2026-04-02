import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { ForgotPass, Login, Register } from '../../screens/Authentication';

const Stack = createStackNavigator();

export default function LoginNavigation(): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: () => <Text className="text-[28px] font-bold text-white">Đăng ký</Text>,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#fff',
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPass}
        options={{
          headerTitle: () => <Text className="text-[28px] font-bold text-white">Quên mật khẩu</Text>,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#fff',
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
