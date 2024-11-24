import AsyncStorage from '@react-native-async-storage/async-storage'
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
import { fetchNotificationsAPI } from '../../api/noti/notìication'

export const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

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

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <View style={styles.notificationIcon}>
          <Text style={styles.iconText}>🔥</Text>
        </View>
        <View style={styles.notificationDetails}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {item.message}
          </Text>
        </View>
      </View>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>1</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông báo</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" style={styles.loader} />
      ) : notifications.length === 0 ? (
        <Text style={styles.noNotifications}>Không có thông báo</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.notificationID}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9', // Soft background color for better contrast
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    shadowColor: '#bdc3c7',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ffecb3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  notificationDetails: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  badgeContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
})

export default NotificationScreen
