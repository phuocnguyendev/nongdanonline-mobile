import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  Info,
  Address,
  ChangePassword,
  Notification,
} from "../screens/user/profile";
import InvoiceNavigation from "./invoiceNavigation";
import Placeholder from "../components/app/lazyPlaceholder";

const Tab = createMaterialTopTabNavigator();

export default function ProfileNavigation({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Placeholder/>,
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: "#00a86b",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: {
          backgroundColor: "#00a86b",
        },
        initialRouteName: "Info",
        tabBarAndroidRipple: { borderless: false },
        tabBarPressColor: "#7affcf",
      }}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        options={{ tabBarLabel: "Hồ sơ" }}
      />
      <Tab.Screen
        name="Address"
        component={Address}
        options={{ tabBarLabel: "Địa chỉ" }}
      />
      <Tab.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ tabBarLabel: "Mật khẩu" }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{ tabBarLabel: "Thông báo" }}
      />
      <Tab.Screen
        name="InvoiceNavigation"
        component={InvoiceNavigation}
        options={{ tabBarLabel: "Đơn mua" }}
      />
    </Tab.Navigator>
  );
}
