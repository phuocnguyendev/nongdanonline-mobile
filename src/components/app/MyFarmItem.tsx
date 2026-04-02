import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InfoScreen from '../../screens/homeTab/InfoScreen';
import type { Block } from '../../types/api.types';

interface MyFarmItemProps {
  hasAnimal: boolean;
  title: string;
  image?: string;
  blockData: Block;
  farmID: string;
  animalID?: string;
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
}

const MyFarmItem: React.FC<MyFarmItemProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { hasAnimal, title, image, blockData, farmID, animalID, navigation } = props;

  return (
    <View className="flex-1 justify-center m-6 rounded-[10px] bg-white border border-[#e0e0e0] shadow-lg p-4 relative">
      <TouchableOpacity
        className="absolute top-2.5 left-2.5 z-10"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="information-circle" size={24} color="#007aff" />
      </TouchableOpacity>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[90%] bg-white p-5 rounded-[10px] items-center relative">
            <TouchableOpacity
              className="absolute top-2.5 right-2.5"
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle" size={28} color="#555" />
            </TouchableOpacity>
            <InfoScreen blockData={blockData} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className="absolute top-2.5 right-2.5 z-10"
        onPress={() => {
          if (hasAnimal) {
            navigation?.navigate('AddPackageScreen', { animalID, blockData });
          } else {
            navigation?.navigate('AddAnimalScreen', { blockData, farmID });
          }
        }}
      >
        <Ionicons
          name={hasAnimal ? 'gift-outline' : 'add-circle-outline'}
          size={24}
          color="#007aff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (hasAnimal) {
            navigation?.navigate('MainImageScreen', { title, blockData, animalID });
          } else {
            navigation?.navigate('AddAnimalScreen', { blockData, farmID });
          }
        }}
      >
        <View className="w-full h-[200px] rounded-t-[10px] overflow-hidden">
          {loading && (
            <ActivityIndicator size="large" color="#00a86b" className="w-full h-full" />
          )}
          <Image
            source={image ? ({ uri: image } as ImageSourcePropType) : undefined}
            className="w-full h-full"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </View>
        <View className="flex-1 my-2.5">
          <Text className="text-xl font-bold text-green-600">{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyFarmItem;
