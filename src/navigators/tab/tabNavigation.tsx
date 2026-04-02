import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Placeholder from '../../components/app/lazyPlaceholder';
import ListFarmNavigation from '../stack/listFarmNavigation';
import MyFarmNavigation from '../stack/myFarmNavigation';
import NotificationNavigation from '../stack/notificationNavigation';

const Tab = createBottomTabNavigator();

interface TabNavigationProps {
  navigation: { toggleDrawer: () => void };
}

function TabNavigation({ navigation }: TabNavigationProps): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        unmountOnBlur: true,
        lazyPlaceholder: () => <Placeholder />,
        headerStyle: { backgroundColor: '#00a86b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={24}
            color="#fff"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        tabBarActiveTintColor: '#00a86b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 15 : 10,
          paddingTop: 10,
          backgroundColor: '#f8f8f8',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 8 : 6,
          textAlign: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MyFarmNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} style={{ paddingBottom: 5 }} />
          ),
          tabBarLabel: 'Home',
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="List Farm"
        component={ListFarmNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-sharp" size={size} color={color} style={{ paddingBottom: 5 }} />
          ),
          tabBarLabel: 'Danh sách Trang trại',
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} style={{ paddingBottom: 5 }} />
          ),
          tabBarLabel: 'Thông báo',
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
