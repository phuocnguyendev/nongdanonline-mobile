import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, Text, View } from 'react-native';
import MyFarmItem from '../../components/app/MyFarmItem';

interface AnimalOwnerUser { animalStageImageUrl?: string; animalName?: string; }
interface BlockData { blockOwnerUserID: string; blockUserCode: string; animalOwnerUsers?: AnimalOwnerUser[]; }
interface BlockListProps { blocks: BlockData[]; loading: boolean; navigation: unknown; selectedFarm: string; handleNavigateToAddAnimal: () => void; }

const BlockList: React.FC<BlockListProps> = ({ blocks, loading, navigation, selectedFarm, handleNavigateToAddAnimal }) => {
  const renderItem: ListRenderItem<BlockData> = useCallback(({ item }) => {
    const animal = item.animalOwnerUsers?.[0];
    return (
      <MyFarmItem image={animal?.animalStageImageUrl || ''} title={animal?.animalName || 'Chưa có vật nuôi'} hasAnimal={!!animal} navigation={navigation as any} blockData={item as any} farmID={selectedFarm} />
    );
  }, [handleNavigateToAddAnimal, navigation, selectedFarm]);

  if (loading) return <ActivityIndicator size="large" color="#00a86b" />;

  return (
    <View className="flex-1 mb-5">
      {blocks.length === 0 ? (
        <Text className="text-base font-bold text-center my-24">Bạn cần chọn trang trại để hiển thị</Text>
      ) : (
        <FlatList data={blocks} renderItem={renderItem} keyExtractor={(item) => item.blockOwnerUserID} initialNumToRender={5} maxToRenderPerBatch={5} scrollEnabled={false} contentContainerStyle={{ paddingBottom: 20 }} />
      )}
    </View>
  );
};

export default BlockList;
