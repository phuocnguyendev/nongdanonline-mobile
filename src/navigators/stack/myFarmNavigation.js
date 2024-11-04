import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import IconButton from '../../components/ui/IconButton'
import { MyFarm } from '../../screens/homeTab'
import MyFarmEditNavigation from './myFarmEditNavigation'

const Stack = createStackNavigator()

export default function MyFarmNavigation({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="My Farm"
        component={MyFarm}
        options={{
          headerShown: true,
          title: 'Trang trại của tôi',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="#fff"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.toggleDrawer()} // Mở Drawer khi nhấn
            />
          ),
          headerRight: () => (
            <IconButton
              icon="cart-outline"
              color="green"
              onPress={() => navigation.navigate('ShoppingCart')}
            />
          ),
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
      <Stack.Screen
        name="My Farm Edit"
        component={MyFarmEditNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
