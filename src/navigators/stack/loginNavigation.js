import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text } from 'react-native'
import { ForgotPass, Login, Register } from '../../screens/Authentication'

const Stack = createStackNavigator()

export default function LoginNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: () => <Text style={styles.title}>Đăng ký</Text>,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPass}
        options={{
          headerTitle: () => <Text style={styles.title}>Quên mật khẩu</Text>,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
})
