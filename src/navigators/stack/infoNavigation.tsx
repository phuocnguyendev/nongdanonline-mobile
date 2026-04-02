import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileNavigation from './profileNavigation';

const Stack = createStackNavigator();

interface InfoNavigationProps {
  navigation: { toggleDrawer: () => void };
}

export default function InfoNavigation({ navigation }: InfoNavigationProps): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#00a86b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <Ionicons name="menu" size={24} color="#fff" style={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />
        ),
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="profileNavigation" options={{ headerShown: true, headerTitle: '' }} component={ProfileNavigation} />
    </Stack.Navigator>
  );
}
