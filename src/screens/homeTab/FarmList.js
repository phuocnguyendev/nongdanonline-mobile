import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { getFarms } from '../../api/farm/index'
import FarmItem from '../../components/app/FarmItem'
import { EmptyPage } from '../emptyView'

export function FarmList({ navigation }) {
  const [farms, setFarms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const data = await getFarms()
        setFarms(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching farms:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchFarms()
  }, [])

  function pressHandler(title, image, farmOwner, phone, farmArea, mapLink) {
    navigation.navigate('AboutFarm Navigation', {
      title,
      image,
      farmOwner,
      phone,
      farmArea,
      mapLink,
    })
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00a86b" />
      </View>
    )
  }

  if (error) {
    return <Text>Error: {error}</Text>
  }

  if (!farms || farms.length === 0) {
    console.log('No farms data available')
    return <EmptyPage />
  }

  function renderFarmItem({ item }) {
    return (
      <FarmItem
        image={item.farmImages[0]?.imagesUrl}
        title={item.farmName}
        description={item.farmDescription}
        mapLink={item.mapLink}
        phone={item.ownerPhone}
        onPress={() =>
          pressHandler(
            item.farmName,
            item.farmImages[0]?.imagesUrl,
            item.farmOwner,
            item.ownerPhone,
            item.farmArea,
            item.mapLink,
          )
        }
      />
    )
  }

  return (
    <FlatList
      data={farms}
      renderItem={renderFarmItem}
      keyExtractor={(item) => item.farmID.toString()}
    />
  )
}
