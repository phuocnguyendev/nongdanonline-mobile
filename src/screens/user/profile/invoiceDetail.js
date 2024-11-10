import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export function InvoiceDetail({ navigation, route }) {
  const { invoiceId } = route.params

  const invoice = INVOICES.find((inv) => inv.invoiceId === invoiceId)

  if (!invoice) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginVertical: 10, color: 'red' }}>
          Đơn hàng không tồn tại hoặc đã bị xóa
        </Text>
      </View>
    )
  }

  // Fake data for transaction info
  const transactionInfo = {
    transactionId: 'TRANSATION-9C36B127',
    transactionDate: '2024-10-17',
    amount: '500.000 ₫',
    paymentMethod: 'PayOS',
  }

  const renderInvoiceHeader = () => (
    <View>
      <Text style={styles.header}>Chi tiết đơn hàng</Text>
      <View style={styles.card}>
        <Text style={styles.invoiceId}>Mã đơn hàng: {invoice.invoiceId}</Text>
        <Text style={[styles.cardText, { marginBottom: 10 }]}>
          Ngày đặt hàng: {invoice.dateOrder}
        </Text>
        <Text style={styles.cardText}>Tổng tiền: </Text>
        <Text
          style={[styles.cardText, { fontWeight: 'bold', color: '#1d4ed8' }]}
        >
          {invoice.totalPrice}
        </Text>
      </View>
      <Text style={styles.subHeader}>Chi tiết sản phẩm:</Text>
    </View>
  )

  const renderProductTable = () => (
    <View>
      {invoice.invoiceDetail.map((item, index) => (
        <View style={styles.productCard} key={index}>
          <View style={styles.detailProduct}>
            <View style={styles.productImageContainer}>
              <View style={styles.productImage} />
            </View>
            <View style={styles.productContent}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productText}>Số lượng: {item.quantity}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.productText}>Đơn giá: {item.price}</Text>
            <Text style={styles.productPrice}>
              Thành tiền: {item.totalPrice}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )

  // Render transaction details table
  const renderTransactionTable = () => (
    <View style={styles.cardTransaction}>
      <Text style={styles.transactionId}>
        Mã giao dịch: {transactionInfo.transactionId}
      </Text>
      <Text style={[styles.cardText, { marginBottom: 10 }]}>
        Ngày giao dịch: {transactionInfo.transactionDate}
      </Text>
      <Text style={[styles.cardText, { marginBottom: 10 }]}>
        Phương thức thanh toán: {transactionInfo.paymentMethod}
      </Text>
      <Text style={styles.cardText}>Số tiền: </Text>
      <Text style={[styles.cardText, { fontWeight: 'bold', color: '#1d4ed8' }]}>
        {transactionInfo.amount}
      </Text>
    </View>
  )

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        {renderInvoiceHeader()}
        {renderProductTable()}
        <Text style={styles.subHeader}>Thông tin giao dịch:</Text>
        {renderTransactionTable()}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
            Trở về
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    elevation: 6,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#d4edda',
    padding: 15,
    borderLeftColor: '#00a86b',
    borderLeftWidth: 7,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  invoiceId: {
    fontSize: 20,
    color: '#00a86b',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#00a86b',
    borderRadius: 5,
    alignItems: 'center',
  },
  productCard: {
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#00a86b',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  detailProduct: {
    flexDirection: 'row',
  },
  productContent: {
    justifyContent: 'space-around',
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  productText: {
    fontSize: 16,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  productPrice: {
    color: '#00a86b',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardTransaction: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderColor: '#00a86b',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderWidth: 3,
    marginVertical: 10,
  },
  transactionId: {
    textAlign: 'center',
    fontSize: 20,
    color: '#00a86b',
    fontWeight: 'bold',
    marginVertical: 10,
  },
})
