import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import IconButton from '../../components/ui/IconButton'
import { FarmList } from '../../screens/homeTab'
import AboutFarmNavigation from './aboutFarmNavigation'

const Stack = createStackNavigator()

export default function ListFarmNavigation({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Farms List"
        component={FarmList}
        options={{
          headerShown: true,
          title: 'Danh sách Trang trại', // Tiêu đề cho header
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
        name="AboutFarm Navigation"
        options={{ headerShown: false }}
        component={AboutFarmNavigation}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
