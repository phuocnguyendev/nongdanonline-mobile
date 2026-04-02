import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../ui/PrimaryButton';

interface FarmItemProps {
  image: string;
  title: string;
  description: string;
  mapLink?: string;
  phone: string;
  farmOwner: string;
  farmArea: string;
  farmID: string;
  onPress: (
    title: string,
    image: string,
    farmOwner: string,
    phone: string,
    farmArea: string,
    mapLink: string | undefined,
    farmID: string,
  ) => void;
}

const FarmItem: React.FC<FarmItemProps> = (props) => {
  const openMap = (link: string): void => {
    Linking.openURL(link).catch((err) =>
      console.error('An error occurred', err),
    );
  };
  const [loading, setLoading] = useState(true);

  return (
    <View className="flex-1 justify-center items-center m-6 rounded-[10px] bg-white border border-[#e0e0e0] shadow-lg">
      <View className="w-full h-[200px] rounded-t-[10px] overflow-hidden">
        {loading && (
          <ActivityIndicator
            size="large"
            color="#00a86b"
            className="w-full h-full justify-center items-center"
          />
        )}
        <Image
          source={{ uri: props.image }}
          className="w-full h-full"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>
      <View className="flex-1 justify-center px-2.5">
        <Text className="mt-2.5 text-2xl font-bold mb-1.5">{props.title}</Text>
        <Text className="text-[15px] text-gray-500 ml-1.5">
          {props.description}
        </Text>
        {props.mapLink && (
          <View className="flex-row items-center my-0.5">
            <Ionicons name="location" size={18} color="gray" />
            <TouchableOpacity onPress={() => openMap(props.mapLink!)}>
              <Text className="text-blue-600 underline text-[15px] ml-1.5">
                Xem bản đồ
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="flex-row items-center my-0.5">
          <Ionicons name="call" size={18} color="gray" />
          <Text className="text-[15px] text-black ml-1.5">{props.phone}</Text>
        </View>
      </View>
      <View className="mt-2.5 mb-2.5">
        <PrimaryButton
          onPress={() =>
            props.onPress(
              props.title,
              props.image,
              props.farmOwner,
              props.phone,
              props.farmArea,
              props.mapLink,
              props.farmID,
            )
          }
        >
          Xem chi tiết
        </PrimaryButton>
      </View>
    </View>
  );
};

export default FarmItem;
