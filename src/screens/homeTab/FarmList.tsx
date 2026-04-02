import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, Text, View } from 'react-native';
import { getFarms } from '../../api/farm/index';
import FarmItem from '../../components/app/FarmItem';
import { EmptyPage } from '../emptyView';

interface FarmImage { imagesUrl: string; }
interface FarmData { farmID: string; farmName: string; farmDescription: string; mapLink?: string; ownerPhone: string; farmImages: FarmImage[]; farmOwner?: string; farmArea?: string; }
interface FarmListProps { navigation: { navigate: (screen: string, params: Record<string, unknown>) => void }; }

export const FarmList: React.FC<FarmListProps> = ({ navigation }) => {
  const [farms, setFarms] = useState<FarmData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarms = async (): Promise<void> => {
      try { const data = await getFarms(); setFarms(data); } catch (err: unknown) { const e = err as Error; setError(e.message); }
      finally { setIsLoading(false); }
    };
    fetchFarms();
  }, []);

  const pressHandler = (initialFarmData: FarmData): void => { navigation.navigate('AboutFarm Navigation', { initialFarmData }); };

  if (isLoading) return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#00a86b" /></View>;
  if (error) return <Text>Error: {error}</Text>;
  if (!farms || farms.length === 0) return <EmptyPage />;

  const renderFarmItem: ListRenderItem<FarmData> = ({ item }) => (
    <FarmItem image={item.farmImages[0]?.imagesUrl} title={item.farmName} description={item.farmDescription} mapLink={item.mapLink} phone={item.ownerPhone} farmID={item.farmID} farmOwner={item.farmOwner || ''} farmArea={item.farmArea || ''} onPress={() => pressHandler(item)} />
  );

  return <FlatList data={farms} renderItem={renderFarmItem} keyExtractor={(item) => item.farmID.toString()} />;
};
