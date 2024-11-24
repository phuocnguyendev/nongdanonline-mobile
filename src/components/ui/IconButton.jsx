import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, View } from 'react-native'

function IconButton({ icon, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    borderRadius: 9,
    padding: 6,
    marginHorizontal: 15,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#f6f6f6',
  },
})
