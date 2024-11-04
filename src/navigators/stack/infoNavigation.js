import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import IconButton from '../../components/ui/IconButton'
import ProfileNavigation from './profileNavigation'

const Stack = createStackNavigator()

export default function InfoNavigation({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#00a86b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="profileNavigation"
        options={{ headerShown: true, headerTitle: '' }}
        component={ProfileNavigation}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
