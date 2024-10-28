import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Modal,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import InvoiceList from "../../../components/app/InvoiceList";
import { INVOICES } from "../../../data/data-invoice";

export function InvoiceInfo({ navigation }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("Tất cả trạng thái");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(INVOICES);
  const [iosdate, setIosDate] = useState(new Date());

  const handleSubmit = () => {
    setIosDate((prevDate) => {
      isSelectingStartDate ? setStartDate(prevDate) : setEndDate(prevDate);
      return prevDate;
    });
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, date) => {
    if (event.type === "set" && date) {
      isSelectingStartDate ? setStartDate(date) : setEndDate(date);
    }
    setShowDatePicker(false);
  };

  const data = useMemo(
    () => [
      { label: "Tất cả trạng thái", value: "Tất cả trạng thái" },
      { label: "Hoàn thành", value: "Hoàn thành" },
      { label: "Đang xử lí", value: "Đang xử lí" },
      { label: "Hủy", value: "Hủy" },
    ],
    []
  );

  const filterInvoices = useCallback(() => {
    const filteredData = INVOICES.filter((invoice) => {
      const invoiceDate = new Date(
        invoice.dateOrder.split("-").reverse().join("-")
      );
      const statusMatch =
        selectedStatus === "Tất cả trạng thái" ||
        invoice.status === selectedStatus;
      const dateMatch =
        (!startDate || invoiceDate >= startDate) &&
        (!endDate || invoiceDate <= endDate);
      const keywordMatch =
        !searchKeyword || invoice.invoiceId.toString().includes(searchKeyword);

      return statusMatch && dateMatch && keywordMatch;
    });
    setFilteredInvoices(filteredData);
  }, [selectedStatus, startDate, endDate, searchKeyword]);

  useEffect(() => {
    filterInvoices();
  }, [selectedStatus, startDate, endDate, searchKeyword]);

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedStatus("Tất cả trạng thái");
    setSearchKeyword("");
    setFilteredInvoices(INVOICES);
  };

  const pressHandler = (invoiceId) => {
    navigation.navigate("InvoiceDetail", { invoiceId });
  };

  const renderInvoiceList = ({ item }) => (
    <InvoiceList
      invoiceId={item.invoiceId}
      status={item.status}
      dateOrder={item.dateOrder}
      totalPrice={item.totalPrice}
      invoiceDetail={item.invoiceDetail}
      onPress={pressHandler}
    />
  );

  const renderHeader = useMemo(
    () => (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Lịch sử giao dịch</Text>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Tất cả trạng thái"
          value={selectedStatus}
          onChange={(item) => setSelectedStatus(item.value)}
          style={styles.dropdown}
        />
        <View style={styles.dateContainer}>
          {["Chọn ngày bắt đầu", "Chọn ngày kết thúc"].map(
            (placeholder, index) => (
              <TouchableOpacity
                key={index}
                style={index === 0 ? styles.touchable : styles.lastTouchable}
                onPress={() => {
                  setIsSelectingStartDate(index === 0);
                  setShowDatePicker(true);
                }}
              >
                <TextInput
                  style={styles.input}
                  value={formatDate(index === 0 ? startDate : endDate)}
                  placeholder={placeholder}
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>
            )
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Mã đơn hàng"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          onSubmitEditing={filterInvoices}
        />

        <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Xóa bộ lọc</Text>
        </TouchableOpacity>

        {/* Modal cho iOS */}
        {Platform.OS === "ios" && (
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={{ backgroundColor: "#fff" }}>
                <DateTimePicker
                  value={
                    isSelectingStartDate
                      ? startDate || new Date()
                      : endDate || new Date()
                  }
                  textColor="black"
                  mode="date"
                  display="spinner"
                  onChange={(event, date) => {
                    setIosDate((prevDate) => {
                      return date;
                    });
                  }}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    title="Hủy"
                    onPress={() => setShowDatePicker(false)}
                    color="#FF0000"
                  />
                  <Button
                    title="Đồng ý"
                    onPress={handleSubmit}
                    color="#00a86b"
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}

        {/* DateTimePicker cho Android */}
        {Platform.OS === "android" && showDatePicker && (
          <DateTimePicker
            value={
              isSelectingStartDate
                ? startDate || new Date()
                : endDate || new Date()
            }
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              handleDateChange(event, date);
            }}
          />
        )}
      </View>
    ),
    [
      selectedStatus,
      startDate,
      endDate,
      searchKeyword,
      data,
      showDatePicker,
      isSelectingStartDate,
    ]
  );

  return (
    <View>
      <FlatList
        data={filteredInvoices}
        renderItem={renderInvoiceList}
        keyExtractor={(item) => item.invoiceId.toString()}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: "#00a86b",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    padding: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
    backgroundColor: "#fff",
    flex: 1,
  },
  touchable: {
    flex: 1,
    marginRight: 15,
  },
  lastTouchable: {
    flex: 1,
  },
  resetButton: {
    backgroundColor: "#00a86b",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 15,
  },
});
