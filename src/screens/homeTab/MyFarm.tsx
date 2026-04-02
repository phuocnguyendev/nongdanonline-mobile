import { useFocusEffect } from '@react-navigation/native';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getBlocksByFarm, getFarms } from '../../api/farm';
import Pagination from '../../components/ui/Pagination';
import { getScreenConfig } from '../../config/screenConfig';
import BlockList from './BlockList';
import MyPackageList from './MyPackageList';

interface FarmData { farmID: string; farmName: string; }
interface MyFarmProps { navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void }; route: { params?: { refresh?: boolean } }; }

export function MyFarm({ navigation, route }: MyFarmProps): React.ReactElement {
  const [farms, setFarms] = useState<FarmData[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [loadingBlocks, setLoadingBlocks] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    const fetchFarms = async (): Promise<void> => {
      setLoadingFarms(true);
      const farmsData = await getFarms();
      setFarms(farmsData);
      setLoadingFarms(false);
    };
    fetchFarms();
  }, []);

  const farmItems = useMemo(() => farms.map((farm) => ({ label: farm.farmName, value: farm.farmID })), [farms]);

  const fetchBlocks = useCallback(
    debounce(async (farmID: string, pageIndex = 1) => {
      setLoadingBlocks(true);
      const response = await getBlocksByFarm(farmID, pageIndex, pageSize);
      const { items, totalPages: fetchedTotalPages } = response;
      const blocksWithAnimalID = items.map((block: any) => ({ ...block, animalID: block.animalOwnerUsers?.animalID || null }));
      setBlocks(blocksWithAnimalID);
      setTotalPages(fetchedTotalPages);
      setLoadingBlocks(false);
    }, 300),
    [],
  );

  useFocusEffect(useCallback(() => { if (route.params?.refresh && selectedFarm) fetchBlocks(selectedFarm, 1); }, [route.params, selectedFarm]));

  const handleFarmSelect = useCallback((farmID: string) => { setSelectedFarm(farmID); setCurrentPage(1); fetchBlocks(farmID, 1); }, [fetchBlocks]);
  const handleNextPage = (): void => { if (currentPage < totalPages) { const next = currentPage + 1; setCurrentPage(next); fetchBlocks(selectedFarm!, next); } };
  const handlePreviousPage = (): void => { if (currentPage > 1) { const prev = currentPage - 1; setCurrentPage(prev); fetchBlocks(selectedFarm!, prev); } };

  const handleNavigateToAddAnimal = (block: any, targetScreen: string): void => {
    const screenConfig = getScreenConfig(selectedFarm!);
    const config = screenConfig[targetScreen];
    if (!config) return;
    const { screenName, params } = config(block);
    navigation.navigate(screenName, params);
  };

  return (
    <ScrollView className="flex-1 p-4">
      {loadingFarms ? <ActivityIndicator size="large" color="#00a86b" /> : (
        <>
          <View className="flex-row items-center mb-2.5" style={{ zIndex: 1000 }}>
            <Text className="text-base mr-2.5 font-bold">Chọn trang trại:</Text>
            <DropDownPicker open={open} value={selectedFarm} items={farmItems} setOpen={setOpen} setValue={setSelectedFarm} setItems={() => {}} onChangeValue={(v) => v && handleFarmSelect(v)} placeholder="Chọn trang trại" containerStyle={{ flex: 1, height: 40 }} style={{ backgroundColor: '#f0f0f0', borderRadius: 5, borderColor: '#d0d0d0', height: 20 }} dropDownContainerStyle={{ backgroundColor: '#f0f0f0', borderColor: '#d0d0d0', zIndex: 1000 }} zIndex={1000} zIndexInverse={3000} />
          </View>
          <Text className="text-base font-bold my-2.5" style={{ zIndex: 1 }}>Số lượng ô đất của bạn: {blocks.length}</Text>
          <BlockList blocks={blocks} loading={loadingBlocks} navigation={navigation} selectedFarm={selectedFarm || ''} handleNavigateToAddAnimal={() => handleNavigateToAddAnimal(null, '')} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPreviousPage={handlePreviousPage} onNextPage={handleNextPage} />
          <View className="mt-5"><MyPackageList /></View>
        </>
      )}
    </ScrollView>
  );
}

export default MyFarm;
