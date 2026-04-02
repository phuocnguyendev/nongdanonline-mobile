import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAnimalDetails } from '../../api/farm/index';
import ActionsScreen from './InfoAnimal/ActionsScreen';
import BlockInfoScreen from './InfoAnimal/BlockInfoScreen';
import CarePackageScreen from './InfoAnimal/CarePackageScreen';
import InfoScreenAnimal from './InfoAnimal/InfoScreen';

const Tab = createMaterialTopTabNavigator();

interface MainImageScreenProps { route: { params: { blockData: any } }; }

const MainImageScreen: React.FC<MainImageScreenProps> = ({ route }) => {
  const { blockData } = route.params;
  const [animalData, setAnimalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const animalOwnerUserId = useMemo(() => blockData?.animalOwnerUsers?.[0]?.animalOwnerUserId, [blockData]);

  useEffect(() => {
    const fetchAnimalData = async (): Promise<void> => {
      try { const data = await getAnimalDetails(animalOwnerUserId); setAnimalData(data); }
      catch (error) { console.error('Error fetching animal data:', error); }
      finally { setLoading(false); }
    };
    fetchAnimalData();
  }, [animalOwnerUserId]);

  if (loading) return <Text className="text-lg text-center mt-5 text-primary">Loading...</Text>;

  return (
    <View className="flex-1">
      <View className="items-center justify-center py-5 bg-primary border-b border-[#ddd]">
        <Image source={{ uri: animalData.animalStageImageUrl }} className="w-[100px] h-[100px] rounded-full mb-3 border-2 border-white" />
        <Text className="text-2xl font-bold text-white mb-1.5">{animalData.animalOwnerUserName}</Text>
        <Text className="text-base text-white">{animalData.developStage}</Text>
      </View>
      <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#ffffff' }, tabBarIndicatorStyle: { backgroundColor: '#00a86b' }, tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12, color: '#333' } }}>
        <Tab.Screen name="Thông tin" component={InfoScreenAnimal} initialParams={{ animalData }} options={{ tabBarIcon: () => <Ionicons name="information-circle-outline" size={20} color="#00a86b" /> }} />
        <Tab.Screen name="Gói chăm sóc" component={CarePackageScreen} initialParams={{ animalData, animalOwnerUserId, blockData }} options={{ tabBarIcon: () => <Ionicons name="cog-outline" size={20} color="#00a86b" /> }} />
        <Tab.Screen name="Thông tin ô đất" component={BlockInfoScreen} initialParams={{ animalData, blockData }} options={{ tabBarIcon: () => <Ionicons name="home-outline" size={20} color="#00a86b" /> }} />
        <Tab.Screen name="Hành động" component={ActionsScreen} initialParams={{ animalData }} options={{ tabBarIcon: () => <Ionicons name="stats-chart-outline" size={20} color="#00a86b" /> }} />
      </Tab.Navigator>
    </View>
  );
};

export default MainImageScreen;
