import React from 'react';
import { FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InvoiceDetailItem {
  name: string;
  quantity: number;
  price: string;
  totalPrice: string;
}

interface InvoiceListProps {
  invoiceId: string;
  status: string;
  dateOrder: string;
  totalPrice: string;
  invoiceDetail: InvoiceDetailItem[];
  onPress: (invoiceId: string) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = (props) => {
  const renderDetailItem: ListRenderItem<InvoiceDetailItem> = ({ item }) => (
    <View className="bg-gray-50 my-1.5 shadow-lg rounded-[10px] flex-row p-2.5 w-full">
      <View className="w-[100px] h-[100px] justify-center items-center bg-[#ccc] rounded-[10px]">
        <Text>100 x 100</Text>
      </View>
      <View className="ml-2.5 flex-1 justify-center">
        <Text className="text-base font-bold text-primary">{item.name}</Text>
        <Text>Số lượng: {item.quantity}</Text>
        <Text>Đơn giá: {item.price}</Text>
        <Text className="text-primary font-bold">Tổng: {item.totalPrice}</Text>
      </View>
    </View>
  );

  const getIconDetails = (status: string): { iconName: string; color: string; backgroundColor: string } => {
    switch (status) {
      case 'Hoàn thành':
        return { iconName: 'checkmark-circle', color: 'green', backgroundColor: '#d4edda' };
      case 'Đang xử lí':
        return { iconName: 'hourglass', color: 'orange', backgroundColor: '#fff3cd' };
      case 'Hủy':
        return { iconName: 'close-circle', color: 'red', backgroundColor: '#f8d7da' };
      default:
        return { iconName: 'information-circle', color: 'gray', backgroundColor: '#f8f9fa' };
    }
  };

  const { iconName, color, backgroundColor } = getIconDetails(props.status);

  return (
    <TouchableOpacity onPress={() => props.onPress(props.invoiceId)}>
      <View className="flex-1 justify-center m-6 rounded-[10px] bg-white border-t-[7px] border-primary shadow-lg p-5">
        <View>
          <View className="flex-row items-center my-2">
            <Ionicons name="bag-handle-outline" size={28} color="#00a86b" />
            <Text className="text-xl text-primary font-bold ml-1.5">Mã đơn: {props.invoiceId}</Text>
          </View>
          <View style={{ backgroundColor }} className="flex-row items-center justify-start py-1.5 px-4 rounded-[20px] self-start my-2">
            <Ionicons name={iconName} size={22} color={color} />
            <Text style={{ color }} className="ml-1.5 font-bold">{props.status}</Text>
          </View>
          <View className="flex-row items-center my-2">
            <Ionicons name="calendar-clear-outline" size={22} />
            <Text className="text-base ml-1.5">Ngày đặt hàng: {props.dateOrder}</Text>
          </View>
          <Text className="text-base">Tổng tiền: <Text className="font-bold text-primary text-lg">{props.totalPrice}</Text></Text>
          <Text className="text-base my-2 font-bold">Chi tiết đơn hàng:</Text>
          <FlatList
            data={props.invoiceDetail}
            renderItem={renderDetailItem}
            keyExtractor={(_, index) => index.toString()}
            className="justify-center items-center"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InvoiceList;
