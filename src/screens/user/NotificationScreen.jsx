import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { fetchNotificationsAPI } from '../../api/noti/notìication' // API lấy thông báo từ server

export const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [connection, setConnection] = useState(null)

  useEffect(() => {
    fetchNotifications()
    setupSignalRConnection()
    registerForPushNotificationsAsync()
  }, [])

  // Lấy thông báo từ API
  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('accessToken')
      if (!token) {
        Alert.alert('Error', 'User not logged in.')
        setLoading(false)
        return
      }

      const decodedToken = jwtDecode(token)
      const userId = decodedToken?.id
      if (!userId) {
        Alert.alert('Error', 'Invalid token. UserID not found.')
        setLoading(false)
        return
      }

      const result = await fetchNotificationsAPI(userId)
      if (result.success) {
        setNotifications(result.data)
      } else {
        Alert.alert('Error', result.message)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      Alert.alert('Error', 'Failed to fetch notifications.')
    } finally {
      setLoading(false)
    }
  }

  const setupSignalRConnection = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      if (!token) {
        console.error('No token found')
        return
      }

      const decodedToken = jwtDecode(token)
      const userId = decodedToken?.id
      if (!userId) {
        console.error('Invalid token. UserID not found.')
        return
      }

      const newConnection = new HubConnectionBuilder()
        .withUrl(process.env.VITE_NOTIFICATION_URL, {
          accessTokenFactory: () => token,
          skipNegotiation: false,
          transport: HttpTransportType.WebSockets,
        })
        .configureLogging(LogLevel.Debug)
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .build()

      newConnection.onclose((err) => {
        console.error('SignalR connection closed:', err)
      })

      newConnection.onreconnecting((err) => {
        console.warn('SignalR is reconnecting...', err)
      })

      newConnection.onreconnected((connectionId) => {
        console.log('SignalR reconnected. Connection ID:', connectionId)
      })

      newConnection.on('ReceiveNotification', (notiDto) => {
        if (notiDto && notiDto.title && notiDto.message) {
          setNotifications((prev) => [notiDto, ...prev])

          Notifications.scheduleNotificationAsync({
            content: {
              title: notiDto.title,
              body: notiDto.message,
            },
            trigger: null,
          })
        } else {
          console.error('Invalid notification structure:', notiDto)
        }
      })

      await newConnection.start()
      console.log('SignalR Connected!')
      setConnection(newConnection)
    } catch (error) {
      console.error('Error setting up SignalR connection:', error)
    }
  }

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission for notifications was denied')
        return
      }

      const token = await Notifications.getExpoPushTokenAsync()
      console.log('Expo Push Token:', token.data)
    } catch (error) {
      console.error('Error getting a push token', error)
    }
  }

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" style={styles.loader} />
      ) : notifications.length === 0 ? (
        <Text style={styles.noNotifications}>Không có thông báo</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item, index) => ` ${item.notificationID}_${index}`}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  loader: {
    marginTop: 50,
  },
  noNotifications: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#7f8c8d',
  },
})

export default NotificationScreen
