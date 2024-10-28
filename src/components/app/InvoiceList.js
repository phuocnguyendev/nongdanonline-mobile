import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import Ionicons from "@expo/vector-icons/Ionicons";
  
  function InvoiceList(props) {
    const renderDetailItem = ({ item }) => (
      <View style={styles.detailItem}>
        <View style={styles.image}>
          <Text>100 x 100</Text>
        </View>
        <View style={styles.detailText}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Số lượng: {item.quantity}</Text>
          <Text>Đơn giá: {item.price}</Text>
          <Text style={styles.price}>Tổng: {item.totalPrice}</Text>
        </View>
      </View>
    );
  
    const getIconDetails = (status) => {
      switch (status) {
        case "Hoàn thành":
          return { iconName: "checkmark-circle", color: "green", backgroundColor: "#d4edda" };
        case "Đang xử lí":
          return { iconName: "hourglass", color: "orange", backgroundColor: "#fff3cd" };
        case "Hủy":
          return { iconName: "close-circle", color: "red", backgroundColor: "#f8d7da" };
        default:
          return { iconName: "information-circle", color: "gray", backgroundColor: "#f8f9fa" };
      }
    };
  
    const { iconName, color, backgroundColor } = getIconDetails(props.status);
  
    return (
      <TouchableOpacity onPress={() => props.onPress(props.invoiceId)}>
        <View style={styles.container}>
          <View>
            <View style={styles.iconView}>
              <Ionicons name="bag-handle-outline" size={28} color="#00a86b" />
              <Text style={styles.invoiceId}>Mã đơn: {props.invoiceId}</Text>
            </View>
            <View style={[styles.status, { backgroundColor }]}>
              <Ionicons name={iconName} size={22} color={color} />
              <Text style={[{ marginLeft: 5, fontWeight: 'bold', color }]}>{props.status}</Text>
            </View>
            <View style={styles.iconView}>
              <Ionicons name="calendar-clear-outline" size={22} />
              <Text style={[styles.text, { marginLeft: 5 }]}>Ngày đặt hàng: {props.dateOrder}</Text>
            </View>
            <Text style={styles.text}>Tổng tiền: <Text style={styles.totalPrice}>{props.totalPrice}</Text></Text>
            <Text style={[styles.text, { marginVertical: 8, fontWeight: 'bold' }]}>Chi tiết đơn hàng:</Text>
            <FlatList
              data={props.invoiceDetail}
              renderItem={renderDetailItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  export default InvoiceList;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      margin: 25,
      borderRadius: 10,
      backgroundColor: "white",
      borderTopWidth: 7,
      borderColor: "#00a86b",
      elevation: 5,
      padding: 20,
    },
    list: {
      justifyContent: "center",
      alignItems: "center",
    },
    detailItem: {
      backgroundColor: "#f9fafb",
      marginVertical: 5,
      elevation: 5,
      borderRadius: 10,
      flexDirection: "row",
      padding: 10,
      width: "100%",
    },
    image: {
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ccc",
      borderRadius: 10,
    },
    detailText: {
      marginLeft: 10,
      flex: 1,
      justifyContent: "center",
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00a86b',
    },
    price: {
      color: '#00a86b',
      fontWeight: 'bold',
    },
    iconView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    invoiceId: {
      fontSize: 20,
      color: '#00a86b',
      fontWeight: 'bold',
      marginLeft: 5,
    },
    text: {
      fontSize: 16,
    },
    status: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginVertical: 8,
    },
    totalPrice: {
      fontWeight: 'bold',
      color: '#00a86b',
      fontSize: 18,
    },
  });
  