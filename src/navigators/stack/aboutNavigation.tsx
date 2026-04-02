import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { About } from '../../screens/about';

const Stack = createStackNavigator();

interface AboutNavigationProps {
  navigation: { toggleDrawer: () => void };
}

export default function AboutNavigation({ navigation }: AboutNavigationProps): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: 'Về chúng tôi',
        headerStyle: { backgroundColor: '#00a86b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <Ionicons name="menu" size={24} color="#fff" style={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />
        ),
      }}
    >
      <Stack.Screen name="AboutUs" component={About} />
    </Stack.Navigator>
  );
}
