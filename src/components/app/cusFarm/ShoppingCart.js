import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { CartContext } from "../../../reducers/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

function ShoppingCart() {
  const { cart, addToCart, updateCartIcon, removeOneFromCart, removeFromCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]); // State to manage selected products

  // Function to handle checkbox selection
  const toggleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      console.log("No items selected for payment");
      return;
    }
    console.log("Payment button pressed for items: ", selectedItems);
  };

  const incrementQuantity = (item) => {
    addToCart(item);
    updateCartIcon();
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      removeOneFromCart({ ...item, quantity: -1 });
    } else {
      removeOneFromCart(item);
    }
    updateCartIcon();
  };

  const Checkbox = ({ checked, onPress }) => {
    return (
      <TouchableOpacity
        style={[styles.checkboxContainer, checked && styles.checkedContainer]}
        onPress={onPress}
      >
        <View style={[styles.checkbox, checked && styles.checked]}>
          {checked && <FontAwesome5 name="check" size={16} color="green" />}
        </View>
      </TouchableOpacity>
    );
  };

  const totalSelectedPrice = useMemo(() => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [selectedItems]);

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...cart]);
    }
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item)}>
        <Animated.View style={[styles.deleteButtonContent, { transform: [{ translateX: trans }] }]}>
          <FontAwesome5 name="trash-alt" size={20} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Giỏ hàng trống</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}>
                <View style={styles.cartItem}>
                  <Checkbox checked={selectedItems.includes(item)} onPress={() => toggleSelectItem(item)} />
                  <View style={styles.itemContainer}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>{item.price} VND</Text>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => decrementQuantity(item)}>
                          <Ionicons
                            name="remove-circle-outline"
                            size={24}
                            color="red"
                          />
                        </TouchableOpacity>
                        <Text style={styles.itemQuantity}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => incrementQuantity(item)}>
                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="green"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Swipeable>
            )}
          />
          <View style={styles.paymentContainer}>
            <View style={styles.selectAllContainer}>
              <Checkbox
                checked={selectedItems.length === cart.length}
                onPress={toggleSelectAll}
              />
              <Text style={styles.selectAllText}>Chọn tất cả</Text>
            </View>
            <Text style={styles.paymentTotal}> {totalSelectedPrice === 0 ? "0 VND" : 
              `${totalSelectedPrice.toLocaleString("vi-VN", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              }).replace(",", ".")} VND`}
            </Text>
            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
              <Text style={styles.paymentButtonText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 20,
  },
 
  emptyCart: {
    fontSize: 18,
    textAlign: "center",
    color: 'red',
    fontWeight: "bold",
  },
  itemName: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    padding: 5,
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  checked: {
    borderColor: "green", 
  },
  itemQuantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,

  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    fontSize: 13,
    marginLeft: -10,
  },
  paymentTotal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "stretch",
  },
  paymentButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 70,
    height: '92%',
  },
  deleteButtonContent: {
    marginRight: 27,
  },
});

export default ShoppingCart;
