import { HttpTransportType, HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
// NOTE: Expo notifications have been removed since Expo environment was ejected.
// Please implement standard Push Notifications manually, for example using `@react-native-firebase/messaging` or similar.
import { fetchNotificationsAPI } from '../../api/noti/notification';

interface NotificationItem {
  notificationID: string;
  title: string;
  message: string;
  date: string;
}

export const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [_connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    fetchNotifications();
    setupSignalRConnection();
  }, []);

  const fetchNotifications = async (): Promise<void> => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'User not logged in.');
        setLoading(false);
        return;
      }
      const decodedToken: any = jwtDecode(token);
      // Determine user id using standard or common claims
      const userId = decodedToken?.id || decodedToken?.sub || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      
      if (!userId) {
        Alert.alert('Error', 'Invalid token. UserID not found.');
        setLoading(false);
        return;
      }

      const result = await fetchNotificationsAPI(userId);
      if (result.success) {
        setNotifications(result.data);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert('Error', 'Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  const setupSignalRConnection = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) { console.error('No token found'); return; }

      const newConnection = new HubConnectionBuilder()
        .withUrl(process.env.VITE_NOTIFICATION_URL || '', {
          accessTokenFactory: () => token,
          skipNegotiation: false,
          transport: HttpTransportType.WebSockets,
        })
        .configureLogging(LogLevel.Debug)
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .build();

      newConnection.onclose((err) => console.error('SignalR connection closed:', err));
      newConnection.onreconnecting((err) => console.warn('SignalR is reconnecting...', err));
      newConnection.onreconnected((connectionId) => console.log('SignalR reconnected:', connectionId));

      newConnection.on('ReceiveNotification', (notiDto: NotificationItem) => {
        if (notiDto && notiDto.title && notiDto.message) {
          setNotifications((prev) => [notiDto, ...prev]);
          // Custom local notification display logic goes here.
        } else {
          console.error('Invalid notification structure:', notiDto);
        }
      });

      await newConnection.start();
      setConnection(newConnection);
    } catch (error) {
      console.error('Error setting up SignalR connection:', error);
    }
  };

  const renderNotificationItem: ListRenderItem<NotificationItem> = ({ item }) => (
    <TouchableOpacity className="bg-white py-3 px-4 my-2 mx-1 rounded-xl border border-[#ecf0f1] shadow-sm">
      <View className="flex-row items-center mb-1">
        <Text className="text-base font-semibold text-[#34495e]">{item.title}</Text>
      </View>
      <Text className="text-sm text-[#7f8c8d] mb-1">{item.message}</Text>
      <Text className="text-xs text-[#95a5a6]">
        {new Date(item.date).toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#f4f6f9] px-4">
      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" className="mt-12" />
      ) : notifications.length === 0 ? (
        <Text className="text-center mt-12 text-base text-[#555]">Không có thông báo</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item, index) => `${item.notificationID}_${index}`}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
