import { useFocusEffect } from '@react-navigation/native'
import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { getBlocksByFarm, getFarms } from '../../api/farm'
import Pagination from '../../components/ui/Pagination'
import { getScreenConfig } from '../../config/screenConfig'
import BlockList from './BlockList'
import MyPackageList from './MyPackageList'
export function MyFarm({ navigation, route }) {
  const [farms, setFarms] = useState([])
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [loadingFarms, setLoadingFarms] = useState(true)
  const [loadingBlocks, setLoadingBlocks] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [open, setOpen] = useState(false)
  const pageSize = 5

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
    debounce(async (farmID, pageIndex = 1) => {
      setLoadingBlocks(true)
      const response = await getBlocksByFarm(farmID, pageIndex, pageSize)

      const { items, totalPages: fetchedTotalPages } = response

      const blocksWithAnimalID = items.map((block) => ({
        ...block,
        animalID: block.animalOwnerUsers?.animalID || null,
      }))

      setBlocks(blocksWithAnimalID)
      setTotalPages(fetchedTotalPages)
      setLoadingBlocks(false)
    }, 300),
    [],
  )
  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh && selectedFarm) {
        fetchBlocks(selectedFarm, 1)
      }
    }, [route.params, selectedFarm]),
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

  const handleNavigateToAddAnimal = (block, targetScreen) => {
    const screenConfig = getScreenConfig(selectedFarm)

    const config = screenConfig[targetScreen]
    if (!config) {
      console.error(`Screen ${targetScreen} not found in configuration.`)
      return
    }

    const { screenName, params } = config(block)
    navigation.navigate(screenName, params)
  }

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
              placeholder="Chọn trang trại"
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

          <BlockList
            blocks={blocks}
            loading={loadingBlocks}
            navigation={navigation}
            selectedFarm={selectedFarm}
            handleNavigateToAddAnimal={handleNavigateToAddAnimal}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />

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

export default MyFarm
