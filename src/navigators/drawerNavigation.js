import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import InfoNavigation from "./infoNavigation";
import TabNavigation from "./tabNavigation";
import ContactNavigation from "./contactNavigation";
import AboutNavigation from "./aboutNavigation";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { userName, userImage, navigation } = props; // Destructure navigation

  const handleLogout = () => {
    navigation.navigate("Login");
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Profile Section */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Info")}
      >
        <ImageBackground
          source={require("../assets/background_user.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.profileView}>
            <Image source={userImage} style={styles.profileImage} />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <Text style={styles.text}>Xem thông tin cá nhân</Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          handleLogout()
        }}
      >
        <Ionicons name="log-out-outline" size={24} color={"#e74c3c"}/>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeTab"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userName="John Doe" // Example user name
          userImage={require("../assets/profile.png")} // Example image
        />
      )}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        gestureEnabled: true,
        drawerPosition: "left",
        drawerActiveBackgroundColor: "#e0ffe1",
        drawerActiveTintColor: "#347928",
        drawerInactiveTintColor: "#347928",
      }}
    >
      <Drawer.Screen
        name="HomeTab"
        component={TabNavigation}
        options={{ drawerLabel: "Trang chủ", unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Info"
        component={InfoNavigation}
        options={{
          drawerItemStyle: {
            display: "none",
          },
          unmountOnBlur: true
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactNavigation}
        options={{ drawerLabel: "Liên hệ", unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="About"
        component={AboutNavigation}
        options={{ drawerLabel: "Về chúng tôi", unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2ecc71", // Green background
  },
  backgroundImage: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  profileView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  drawerItems: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  logoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderTopWidth: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c", // Red color for logout
    textAlign: "center",
    marginLeft: 10,
  },
});
