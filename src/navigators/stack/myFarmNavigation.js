import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import IconButton from '../../components/ui/IconButton'
import AddAnimalScreen from '../../screens/homeTab/AddAnimalScreen'
import AddPackageScreen from '../../screens/homeTab/AddPackageScreen'
import InfoScreen from '../../screens/homeTab/InfoScreen'
import MainImageScreen from '../../screens/homeTab/MainImageScreen'
import { MyFarm } from '../../screens/homeTab/MyFarm'
import ShoppingCart from '../../screens/homeTab/ShoppingCart'
import MyFarmEditNavigation from '../stack/myFarmEditNavigation'
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
              onPress={() => navigation.toggleDrawer()}
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
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          title: 'Thông tin trang trại',
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="AddAnimalScreen"
        component={AddAnimalScreen}
        options={{
          title: 'Thêm động vật mới',
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="AddPackageScreen"
        component={AddPackageScreen}
        options={{
          title: 'Thêm gói mới',
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MainImageScreen"
        component={MainImageScreen}
        options={{
          title: 'Chi tiết hình ảnh',
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          title: 'Giỏ hàng',
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}
