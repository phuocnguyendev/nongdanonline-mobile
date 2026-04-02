import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Contact } from '../../screens/contact';

const Stack = createStackNavigator();

interface ContactNavigationProps {
  navigation: { toggleDrawer: () => void };
}

export default function ContactNavigation({ navigation }: ContactNavigationProps): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: { backgroundColor: '#00a86b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <Ionicons name="menu" size={24} color="#fff" style={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />
        ),
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="ContactUs" component={Contact} />
    </Stack.Navigator>
  );
}
