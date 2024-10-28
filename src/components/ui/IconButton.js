import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from 'react'; // Add this import
import { CartContext } from '../../reducers/CartContext'; // Add this import

function IconButton({ icon, color, onPress }) {
  const { cart } = useContext(CartContext);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={color} />
        {cart.length > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default IconButton;

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
    borderColor: "green",
    backgroundColor:"#f6f6f6"
  },
  badgeContainer: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
