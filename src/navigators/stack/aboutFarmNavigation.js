import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import IconButton from '../../components/ui/IconButton'
import { FarmInfo, ProductFarm } from '../../screens/homeTab/farm/index'
import ShoppingCart from '../../screens/homeTab/ShoppingCart'
const Stack = createStackNavigator()

export default function AboutFarmNavigation({ route, navigation }) {
  const { initialFarmData } = route.params
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Farm Info"
        component={FarmInfo}
        initialParams={{ initialFarmData }}
        options={{
          title: 'Thông tin Trang trại',
          headerStyle: {
            backgroundColor: '#00a86b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <IconButton
              icon="cart-outline"
              color="green"
              onPress={() => navigation.navigate('ShoppingCart')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Product Farm"
        component={ProductFarm}
        options={{
          title: 'Sản phẩm & Dịch vụ',
          headerStyle: {
            backgroundColor: '#00a86b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerLeft: null,
          headerRight: () => (
            <IconButton
              icon="cart-outline"
              color="green"
              onPress={() => navigation.navigate('ShoppingCart')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ShoppingCart"
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
      />
    </Stack.Navigator>
  )
}
