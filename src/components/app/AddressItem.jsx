import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const AddressItem = ({
  name,
  phone,
  address,
  isdefault, // Use `isdefault` to match the API response
  onUpdate,
  onSetDefault,
  onDelete,
}) => {
  const [loadingSetDefault, setLoadingSetDefault] = useState(false)

  const handleSetDefaultClick = async () => {
    setLoadingSetDefault(true)
    try {
      await onSetDefault()
    } catch (error) {
      console.error('Error setting default address:', error.message)
    } finally {
      setLoadingSetDefault(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {name} <Text style={styles.phone}>({phone})</Text>
        </Text>
        <Text style={styles.address}>{address}</Text>
        {isdefault ? (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Mặc định</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.setDefaultButton,
              loadingSetDefault && styles.disabledButton,
            ]}
            onPress={handleSetDefaultClick}
            disabled={loadingSetDefault}
          >
            {loadingSetDefault ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.setDefaultText}>Thiết lập mặc định</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onUpdate}>
            <Text style={styles.updateText}>Cập nhật</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.deleteText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginVertical: 8,
  },
  defaultBadge: {
    backgroundColor: '#f87171',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  defaultText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'column',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  updateText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  setDefaultButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  setDefaultText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default AddressItem
