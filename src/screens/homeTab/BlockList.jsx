import React, { useCallback } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import MyFarmItem from '../../components/app/MyFarmItem'

const BlockList = ({
  blocks,
  loading,
  navigation,
  selectedFarm,
  handleNavigateToAddAnimal,
}) => {
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
          hasAnimal={!!animal}
          navigation={navigation}
          blockData={item}
          farmID={selectedFarm}
          onPress={() => handleNavigateToAddAnimal()}
        />
      )
    },
    [handleNavigateToAddAnimal, navigation],
  )

  if (loading) {
    return <ActivityIndicator size="large" color="#00a86b" />
  }

  return (
    <View style={styles.container}>
      {blocks.length === 0 ? (
        <Text style={styles.text}>Bạn cần chọn trang trại để hiển thị</Text>
      ) : (
        <>
          <FlatList
            data={blocks}
            renderItem={renderItem}
            keyExtractor={(item) => item.blockOwnerUserID}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={50}
            windowSize={11}
            scrollEnabled={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 100,
  },
})

export default BlockList
