import { Ionicons } from '@expo/vector-icons'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import React from 'react'
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { AboutNavigation, ContactNavigation, InfoNavigation } from '../stack'
import { TabNavigation } from '../tab'

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
  const { userName, userImage, navigation } = props
  const handleLogout = () => {
    navigation.navigate('Login')
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate('Info')}
      >
        <ImageBackground
          source={require('../../assets/background_user.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.profileView}>
            <Image source={{ uri: userImage }} style={styles.profileImage} />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <Text style={styles.text}>Xem thông tin cá nhân</Text>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={'#e74c3c'} />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  )
}

export default function DrawerNavigator() {
  const userInfo = useSelector((state) => state.user.userInfo)

  return (
    <Drawer.Navigator
      initialRouteName="HomeTab"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userName={userInfo?.name}
          userImage={userInfo?.avatar}
        />
      )}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        gestureEnabled: true,
        drawerPosition: 'left',
        drawerActiveBackgroundColor: '#e0ffe1',
        drawerActiveTintColor: '#347928',
        drawerInactiveTintColor: '#347928',
      }}
    >
      <Drawer.Screen
        name="HomeTab"
        component={TabNavigation}
        options={{ drawerLabel: 'Trang chủ', unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Info"
        component={InfoNavigation}
        options={{
          drawerItemStyle: { display: 'none' },
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactNavigation}
        options={{ drawerLabel: 'Liên hệ', unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="About"
        component={AboutNavigation}
        options={{ drawerLabel: 'Về chúng tôi', unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2ecc71',
  },
  backgroundImage: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  drawerItems: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  logoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginLeft: 10,
  },
})
