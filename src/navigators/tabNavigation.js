import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ListFarmNavigation from "./listFarmNavigation";
import MyFarmNavigation from "./myFarmNavigation";
import Placeholder from "../components/app/lazyPlaceholder";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigation({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Placeholder />,
        headerStyle: {
          backgroundColor: "#00a86b",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={24}
            color="#fff"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        tabBarActiveTintColor: "#00a86b",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: Platform.OS === 'ios' ? 10 : 0,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
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
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
          tabBarLabel: "Trang trại của tôi",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="List Farm"
        component={ListFarmNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-sharp" size={size} color={color} />
          ),
          tabBarLabel: "Danh sách Trang trại",
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}
