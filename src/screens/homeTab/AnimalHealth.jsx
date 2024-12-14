import { useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import HealthRecord from '../../components/app/HealthRecord'

const AnimalHealth = () => {
  const route = useRoute()
  const { animalOwnerId } = route.params

  return (
    <ScrollView style={styles.container}>
      <HealthRecord animalOwnerUserId={animalOwnerId} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827', // Dark text
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280', // Gray text
    marginTop: 4,
  },
})

export default AnimalHealth
