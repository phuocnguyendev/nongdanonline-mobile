import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Camera from './Camera';

interface ActionsScreenProps {
  route: { params: { animalData: any } };
  navigation: { navigate: (screen: string, params?: any) => void };
}

const ActionsScreen: React.FC<ActionsScreenProps> = ({ route, navigation }) => {
  const { animalData } = route.params;
  const [isCameraVisible, setCameraVisible] = useState(false);
  const sensors = animalData.sensorResponses || [];
  const penCode = animalData.penCode;
  const developStage = animalData.developStage;

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-[#f5f5f5] p-5">
        <TouchableOpacity
          className="bg-[#007bff] p-4 rounded-lg mb-4 items-center justify-center"
          onPress={() => setCameraVisible(true)}
        >
          <Ionicons name="camera-outline" size={24} color="white" />
          <Text className="text-lg text-white font-bold">Xem Camera</Text>
          <Text className="text-sm text-white mt-1">Theo dõi trực tiếp qua camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#007bff] p-4 rounded-lg mb-4 items-center justify-center"
          onPress={() => navigation.navigate('Sensor', { sensorResponses: sensors })}
        >
          <Ionicons name="analytics-outline" size={24} color="white" />
          <Text className="text-lg text-white font-bold">Xem Dữ Liệu Cảm Biến</Text>
          <Text className="text-sm text-white mt-1">Kiểm tra các chỉ số môi trường</Text>
        </TouchableOpacity>
      </ScrollView>

      <Camera
        visible={isCameraVisible}
        onClose={() => setCameraVisible(false)}
        penCode={penCode}
        developStage={developStage}
      />
    </View>
  );
};

export default ActionsScreen;
