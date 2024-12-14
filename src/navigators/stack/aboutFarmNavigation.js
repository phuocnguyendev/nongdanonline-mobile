import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { FarmInfo, ProductFarm } from '../../screens/homeTab/farm/index'
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
        }}
      />
    </Stack.Navigator>
  )
}
