import { useCallback, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AddNewCarePackage from '../../../components/app/cusFarm/AddNewCarePackage'
import AddNewFarmModal from '../../../components/app/cusFarm/AddNewFarmModal'
import FarmList from '../../../components/app/cusFarm/CusFarmList'
import AddMyCarePackage from '../../../components/app/myBlockLand/AddMyCarePackage'
import FarmModal from '../../../components/app/myBlockLand/modal/CusBlockModal'
import Pagination from '../../../components/ui/Pagination'
import LANDS from '../../../data/data-land'

export function MyFarmEdit({ navigation }) {
  const [numberFarms, setNumberFarms] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFarmModalVisible, setIsFarmModalVisible] = useState(false)
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [isAddFarmModalVisible, setIsAddFarmModalVisible] = useState(false)
  const [isAddMyCarePackageModalVisible, setIsAddMyCarePackageModalVisible] =
    useState(false)
  const [isAddNewCarePackageModalVisible, setIsAddNewCarePackageModalVisible] =
    useState(false)
  // const [isAddCarePackageModalVisible, setIsAddCarePackageModalVisible] = useState(false);

  const numberOptions = useMemo(
    () => [
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
    ],
    [],
  )

  const totalPages = useMemo(
    () => Math.ceil(LANDS.length / numberFarms),
    [LANDS.length, numberFarms],
  )

  const farmsToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * numberFarms
    const endIndex = startIndex + numberFarms
    return LANDS.slice(startIndex, endIndex)
  }, [currentPage, numberFarms])

  const handleDropdownChange = useCallback((item) => {
    setNumberFarms(item.value)
    setCurrentPage(1)
  }, [])

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const handleAddNewFarm = useCallback(() => {
    setIsAddFarmModalVisible(true)
  }, [])

  const handleShowFarmModal = useCallback((farm) => {
    setSelectedFarm(farm)
    setIsFarmModalVisible(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsAddFarmModalVisible(false)
    setIsFarmModalVisible(false)
    setSelectedFarm(null)
    setIsAddMyCarePackageModalVisible(false)
    setIsAddNewCarePackageModalVisible(false)
    // setIsAddCarePackageModalVisible(false);
  }, [])

  const handleNavigation = useCallback(
    (nav, data) => {
      navigation.navigate(nav, data)
    },
    [navigation],
  )

  const handleAddMyCarePackagePress = useCallback(() => {
    setIsAddMyCarePackageModalVisible(true)
  }, [])

  const handleAddNewCarePackagePress = useCallback(() => {
    setIsAddNewCarePackageModalVisible(true)
  }, [])

  // const handleAddCarePackagePress = useCallback(() => {
  //   setIsAddCarePackageModalVisible(true);
  // }, []);

  const renderFarmList = useCallback(
    () => (
      <FarmList
        farms={farmsToDisplay}
        numberFarms={numberFarms}
        onShowFarmModal={handleShowFarmModal}
        onAddPress={handleAddNewFarm}
        onCarePackagePress={handleAddMyCarePackagePress}
        onNewCarePackagePress={handleAddNewCarePackagePress}
        // onAddCarePackagePress={handleAddCarePackagePress}
      />
    ),
    [
      farmsToDisplay,
      numberFarms,
      handleShowFarmModal,
      handleAddNewFarm,
      handleAddMyCarePackagePress,
      handleAddNewCarePackagePress,
      // handleAddCarePackagePress,
    ],
  )

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.text}>Số lượng ô đất mỗi trang:</Text>
        <Dropdown
          data={numberOptions}
          onChange={handleDropdownChange}
          labelField="label"
          valueField="value"
          value={numberFarms}
          placeholderStyle={styles.dropdownPlaceholder}
          style={styles.dropdown}
        />
      </View>
      <Text style={styles.numberText}>
        Số lượng ô đất của bạn: {LANDS.length}
      </Text>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.farmListContainer}
          data={[{ key: 'farmList' }]}
          renderItem={renderFarmList}
          keyExtractor={(item) => item.key}
          ListFooterComponent={<View style={styles.footerSpacer} />}
        />
      </View>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />

      <FarmModal
        farm={selectedFarm}
        visible={isFarmModalVisible}
        onClose={handleCloseModal}
        navigation={handleNavigation}
      />
      <AddNewFarmModal
        visible={isAddFarmModalVisible}
        onClose={handleCloseModal}
      />
      <AddNewCarePackage
        visible={isAddNewCarePackageModalVisible}
        onClose={handleCloseModal}
      />
      <AddMyCarePackage
        visible={isAddMyCarePackageModalVisible}
        onClose={handleCloseModal}
      />
      {/* <AddCarePackage
        visible={isAddCarePackageModalVisible}
        onClose={handleCloseModal}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    width: 60,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 10,
    marginBottom: 10,
  },
  dropdownPlaceholder: {
    color: 'gray',
  },
  numberText: {
    fontSize: 16,
    marginTop: 10,
  },
  farmListContainer: {
    flexGrow: 0,
    justifyContent: 'flex-start',
    paddingBottom: 60,
  },
  footerSpacer: {
    height: 20,
  },
})
