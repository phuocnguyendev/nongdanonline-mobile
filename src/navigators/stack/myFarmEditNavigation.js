import { createStackNavigator } from '@react-navigation/stack'
import React from 'react' // Remove useState import

const Stack = createStackNavigator()

export default function MyFarmEditNavigation({ route, navigation }) {
  const title = route.params?.title

  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Edit Screen"
        component={MyFarmEdit}
        options={{
          title: title,
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
