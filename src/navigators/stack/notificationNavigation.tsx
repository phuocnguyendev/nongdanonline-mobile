import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from '../../screens/user/NotificationScreen';

const Stack = createStackNavigator();

interface NotificationNavigationProps {
  navigation: { toggleDrawer: () => void };
}

export default function NotificationNavigation({ navigation }: NotificationNavigationProps): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Notification List"
        component={NotificationScreen}
        options={{
          headerShown: true,
          title: 'Thông báo',
          headerLeft: () => (
            <Ionicons name="menu" size={24} color="#fff" style={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />
          ),
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
