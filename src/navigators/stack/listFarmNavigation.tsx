import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FarmList } from '../../screens/homeTab';
import AboutFarmNavigation from './aboutFarmNavigation';

const Stack = createStackNavigator();

interface ListFarmNavigationProps {
  navigation: { toggleDrawer: () => void };
}

export default function ListFarmNavigation({ navigation }: ListFarmNavigationProps): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Farms List"
        component={FarmList}
        options={{
          headerShown: true,
          title: 'Danh sách Trang trại',
          headerLeft: () => (
            <Ionicons name="menu" size={24} color="#fff" style={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />
          ),
          headerStyle: { backgroundColor: '#00a86b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="AboutFarm Navigation" component={AboutFarmNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
