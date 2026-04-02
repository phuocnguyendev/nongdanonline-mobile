import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

// Placeholder component since MyFarmEdit was undefined in original code
const MyFarmEditPlaceholder: React.FC = () => (
  <View className="flex-1 justify-center items-center">
    <Text>Edit Screen</Text>
  </View>
);

interface MyFarmEditNavigationProps {
  route: { params?: { title?: string } };
}

export default function MyFarmEditNavigation({ route }: MyFarmEditNavigationProps): React.ReactElement {
  const title = route.params?.title || 'Edit';

  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Edit Screen"
        component={MyFarmEditPlaceholder}
        options={{
          title,
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
