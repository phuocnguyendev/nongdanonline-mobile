import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { fetchCameraData } from '../../../api/sensor/sensorService';

interface CameraProps {
  visible: boolean;
  onClose: () => void;
  penCode: string;
  developStage: string;
}

const Camera: React.FC<CameraProps> = ({ visible, onClose, penCode, developStage }) => {
  const [_cameraData, setCameraData] = useState<any>(null); // Replaced to avoid TS warning
  const [cameraUrl, setCameraUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data = await fetchCameraData(penCode);
        const url = `${process.env.VITE_API_URL || ''}${data}`;
        setCameraData(data);
        setCameraUrl(url);
      } catch (error) {
        console.error('Error fetching camera data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (penCode && visible) {
      fetchData();
    }
  }, [penCode, visible]);

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="w-[90%] bg-white p-5 rounded-[10px] items-center relative mt-[20%]">
          <TouchableOpacity onPress={onClose} className="absolute top-2.5 right-2.5 z-10">
            <Ionicons name="close-circle" size={32} color="#FF3333" />
          </TouchableOpacity>

          <Text className="text-xl font-bold mb-5">Camera Giám Sát</Text>
          
          <View className="flex-row items-center mb-5">
            <Text className="text-base font-semibold">Giai Đoạn</Text>
            <View className="flex-row items-center bg-[#FFF0B2] px-2.5 py-1 rounded-full ml-2.5">
              <MaterialCommunityIcons name="egg" size={18} color="#FFA500" className="mr-1" />
              <Text className="text-[#FFA500] font-bold">{developStage}</Text>
            </View>
          </View>

          <View className="w-full h-[200px] mb-5">
            {loading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <Video
                source={{ uri: cameraUrl }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                onError={(e) => console.error('Video Error:', e)}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Camera;
