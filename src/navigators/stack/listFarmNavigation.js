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
          title: 'Danh sách Trang trại',
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
        name="AboutFarm Navigation"
        component={AboutFarmNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
