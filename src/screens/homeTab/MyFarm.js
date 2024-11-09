import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { getBlocksByFarm, getFarms } from '../../api/farm'
import MyFarmItem from '../../components/app/MyFarmItem'
import MyPackageList from './MyPackageList'

export function MyFarm({ navigation }) {
  const [farms, setFarms] = useState([])
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [loadingFarms, setLoadingFarms] = useState(true)
  const [loadingBlocks, setLoadingBlocks] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchFarms = async () => {
      setLoadingFarms(true)
      const farmsData = await getFarms()
      setFarms(farmsData)
      setLoadingFarms(false)
    }
    fetchFarms()
  }, [])

  const farmItems = useMemo(
    () => farms.map((farm) => ({ label: farm.farmName, value: farm.farmID })),
    [farms],
  )

  const fetchBlocks = useCallback(
    debounce(async (farmID, page = 1) => {
      setLoadingBlocks(true)
      const response = await getBlocksByFarm(farmID, page)
      console.log('Full API response:', JSON.stringify(response, null, 2))
      const { items, totalPages } = response
      setBlocks(items)
      setTotalPages(totalPages)
      setLoadingBlocks(false)
    }, 300),
    [],
  )

  const handleFarmSelect = useCallback(
    (farmID) => {
      setSelectedFarm(farmID)
      setCurrentPage(1)
      fetchBlocks(farmID, 1)
    },
    [fetchBlocks],
  )

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      fetchBlocks(selectedFarm, nextPage)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1
      setCurrentPage(prevPage)
      fetchBlocks(selectedFarm, prevPage)
    }
  }

  const combinedData = useMemo(
    () => (blocks.length ? [...blocks] : []),
    [blocks],
  )

  const handleNavigateToAddAnimal = (block) => {
    navigation.navigate('AddAnimalScreen', {
      blockOwnerUserID: block.blockOwnerUserID,
      farmId: selectedFarm,
      animalTypeId: block.animalTypeID,
    })
  }

  const renderItem = useCallback(
    ({ item }) => {
      const animal = item.animalOwnerUsers?.[0]
      return (
        <MyFarmItem
          image={
            animal?.animalStageImageUrl ||
            'https://res.cloudinary.com/dmyyf65yy/image/upload/v1724502434/fiverr/ypgjrvh2by4uf5yhzm6n.jpg'
          }
          title={animal?.animalName || 'Chưa có vật nuôi'}
          farmCode={item.blockUserCode}
          hasAnimal={animal != null}
          navigation={navigation}
          blockData={item}
          onPress={() => handleNavigateToAddAnimal(item)}
        />
      )
    },
    [handleNavigateToAddAnimal, navigation],
  )

  return (
    <ScrollView style={styles.container}>
      {loadingFarms ? (
        <ActivityIndicator size="large" color="#00a86b" />
      ) : (
        <>
          <View style={styles.selectorContainer}>
            <Text style={styles.label}>Chọn trang trại:</Text>
            <DropDownPicker
              open={open}
              value={selectedFarm}
              items={farmItems}
              setOpen={setOpen}
              setValue={setSelectedFarm}
              setItems={() => {}}
              onChangeValue={handleFarmSelect}
              placeholder="Select a farm"
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownList}
              zIndex={1000}
              zIndexInverse={3000}
            />
          </View>

          <Text style={styles.blockCount}>
            Số lượng ô đất của bạn: {blocks.length}
          </Text>

          {loadingBlocks ? (
            <ActivityIndicator size="large" color="#00a86b" />
          ) : combinedData.length === 0 ? (
            <Text style={styles.text}>Bạn cần chọn trang trại để hiển thị</Text>
          ) : (
            <View style={styles.flatListContainer}>
              <FlatList
                data={combinedData}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                  item.blockOwnerUserID || `package-${index}`
                }
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={50}
                windowSize={11}
                getItemLayout={(data, index) => ({
                  length: 80,
                  offset: 80 * index,
                  index,
                })}
                scrollEnabled={false}
                navigation={navigation}
              />

              <View style={styles.paginationContainer}>
                <Button
                  title="Previous"
                  onPress={handlePreviousPage}
                  disabled={currentPage === 1}
                />
                <Text>{`${currentPage} / ${totalPages}`}</Text>
                <Button
                  title="Next"
                  onPress={handleNextPage}
                  disabled={currentPage === totalPages}
                />
              </View>
            </View>
          )}

          {/* MyPackageList component in a separate container */}
          <View style={styles.packageListContainer}>
            <MyPackageList />
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 1,
    height: 40,
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderColor: '#d0d0d0',
    height: 20,
  },
  dropdownList: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d0d0d0',
    zIndex: 1000,
  },
  blockCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 100,
  },
  flatListContainer: {
    flex: 1,
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  packageListContainer: {
    marginTop: 20,
  },
})
