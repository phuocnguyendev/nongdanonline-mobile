import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const InfoItem = ({ label, value, iconName }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.iconLabelContainer}>
        <Ionicons name={iconName} size={20} color="#00a86b" />
        <Text style={styles.label}>{label}:</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 0.48,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    justifyContent: 'center',
    minHeight: 100,
    marginBottom: 16,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
})

export default InfoItem
