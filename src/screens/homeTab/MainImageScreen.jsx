import { Ionicons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { getAnimalDetails } from '../../api/farm/index'
import ActionsScreen from './InfoAnimal/ActionsScreen'
import BlockInfoScreen from './InfoAnimal/BlockInfoScreen'
import CarePackageScreen from './InfoAnimal/CarePackageScreen'
import InfoScreen from './InfoAnimal/InfoScreen'

const Tab = createMaterialTopTabNavigator()

const MainImageScreen = ({ route }) => {
  const { blockData } = route.params
  const [animalData, setAnimalData] = useState(null)
  const [loading, setLoading] = useState(true)
  const animalOwnerUserId = useMemo(
    () => blockData?.animalOwnerUsers?.[0]?.animalOwnerUserId,
    [blockData],
  )
  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const data = await getAnimalDetails(animalOwnerUserId)
        setAnimalData(data)
      } catch (error) {
        console.error('Error fetching animal data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimalData()
  }, [animalOwnerUserId])

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={{ uri: animalData.animalStageImageUrl }}
          style={styles.image}
        />
        <Text style={styles.name}>{animalData.animalOwnerUserName}</Text>
        <Text style={styles.stage}>{animalData.developStage}</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tab.Screen
          name="Thông tin"
          component={InfoScreen}
          initialParams={{ animalData }}
          options={{
            tabBarIcon: () => (
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#00a86b"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Gói chăm sóc"
          component={CarePackageScreen}
          initialParams={{ animalData, animalOwnerUserId, blockData }}
          options={{
            tabBarIcon: () => (
              <Ionicons name="cog-outline" size={20} color="#00a86b" />
            ),
          }}
        />
        <Tab.Screen
          name="Thông tin ô đất"
          component={BlockInfoScreen}
          initialParams={{ animalData, blockData }}
          options={{
            tabBarIcon: () => (
              <Ionicons name="home-outline" size={20} color="#00a86b" />
            ),
          }}
        />
        <Tab.Screen
          name="Hành động"
          component={ActionsScreen}
          initialParams={{ animalData }}
          options={{
            tabBarIcon: () => (
              <Ionicons name="stats-chart-outline" size={20} color="#00a86b" />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#00a86b', // Green background for header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2, // Border around image for more contrast
    borderColor: '#fff', // White border color for the image
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text color for name
    marginBottom: 6,
  },
  stage: {
    fontSize: 16,
    color: '#fff', // Light white color for stage
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  tabBarIndicator: {
    backgroundColor: '#00a86b', // Green indicator for selected tab
  },
  tabBarLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333', // Darker text color for labels
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#00a86b', // Green color for loading text
  },
})

export default MainImageScreen
