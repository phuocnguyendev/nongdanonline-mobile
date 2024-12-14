import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { Contact } from '../../screens/contact'

const Stack = createStackNavigator()

export default function ContactNavigation({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#00a86b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Define headerLeft globally for all screens
        headerLeft: () => (
          <Ionicons
            name="menu" // Hamburger icon
            size={24}
            color="#fff"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="ContactUs" component={Contact} />
    </Stack.Navigator>
  )
}
