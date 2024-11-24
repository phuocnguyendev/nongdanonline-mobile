import { createStackNavigator } from '@react-navigation/stack'
import { HistoryOrder, HistoryOrderDetails } from '../../screens/user/profile'

const Stack = createStackNavigator()

export default function InvoiceNavigation({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryOrder"
        component={HistoryOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryOrderDetails"
        component={HistoryOrderDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
