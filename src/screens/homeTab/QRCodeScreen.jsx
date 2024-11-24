import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

function QRCodeScreen({ route, navigation }) {
  const { qrCode } = route.params || {}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Thanh Toán</Text>
      {qrCode ? (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrCode} size={250} />
          <Text style={styles.qrCodeText}>Mã QR của bạn</Text>
        </View>
      ) : (
        <Text style={styles.noQRCodeText}>Không có mã QR để hiển thị</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShoppingCart')}
      >
        <Text style={styles.buttonText}>Trở về</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  qrCodeText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    fontWeight: 'bold',
  },
  noQRCodeText: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#00a86b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default QRCodeScreen
