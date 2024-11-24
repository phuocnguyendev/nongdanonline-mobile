import Ionicons from '@expo/vector-icons/Ionicons'
import { useHeaderHeight } from '@react-navigation/elements'
import React, { useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { postForgotPass } from '../../api/auth/index'

export function ForgotPass({}) {
  const headerHeight = useHeaderHeight()
  const dismissKeyboard = () => Keyboard.dismiss()
  const [inputFocused, setInputFocused] = useState(null)
  const [email, setEmail] = useState(null)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false)
  const [modalFailVisible, setModalFailVisible] = useState(false)

  const handleChangeEmail = (value) => {
    setEmail(value)
    setIsValidEmail(validateEmail(value))
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSend = async () => {
    try {
      const data = {
        email: email,
      }

      await postForgotPass(data)
      setModalSuccessVisible(true)
    } catch (error) {
      setModalFailVisible(true)
      console.error('Error:', error)
    }
  }

  const closeModal = () => {
    setModalSuccessVisible(false)
    setModalFailVisible(false)
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground
        source={require('../../assets/background2.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={[styles.container, { paddingTop: headerHeight + 100 }]}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={[
                styles.label,
                inputFocused === 'email' && styles.labelFocused,
              ]}
            >
              Email
            </Text>
            <View
              style={[
                styles.inputContainer,
                inputFocused === 'email' && styles.inputFocused,
              ]}
            >
              <TextInput
                placeholder="john.doe@gmail.com"
                onChangeText={handleChangeEmail}
                style={styles.input}
                onFocus={() => setInputFocused('email')}
                onBlur={() => setInputFocused(null)}
              />
            </View>
            {email ? (
              isValidEmail ? null : (
                <Text style={styles.errorText}>Email không hợp lệ</Text>
              )
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.nextContainer,
              !isValidEmail && styles.disabledButton,
            ]}
            onPress={handleSend}
            disabled={!isValidEmail}
          >
            <Text style={styles.nextText}>Gửi</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Thành Công */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalSuccessVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, styles.successModal]}>
              <Ionicons name="checkmark-circle" size={64} color="#4caf50" />
              <Text style={[styles.modalTitle, { color: '#4caf50' }]}>
                Thành công!
              </Text>
              <Text style={styles.modalMessage}>
                Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư
                của bạn.
              </Text>
              <TouchableOpacity
                style={[styles.understoodButton, styles.successButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Đã hiểu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Thất Bại */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFailVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, styles.failModal]}>
              <Ionicons name="close-circle" size={64} color="#f44336" />
              <Text style={[styles.modalTitle, { color: '#f44336' }]}>
                Thất bại!
              </Text>
              <Text style={styles.modalMessage}>
                Không thể gửi email. Vui lòng thử lại sau.
              </Text>
              <TouchableOpacity
                style={[styles.understoodButton, styles.failButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Đã hiểu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + StatusBar.currentHeight,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputFocused: {
    borderBottomColor: '#4caf50',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  labelFocused: {
    color: '#4caf50',
  },
  input: {
    padding: 2,
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  nextContainer: {
    borderRadius: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    elevation: 4,
  },
  nextText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  successModal: {
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  failModal: {
    borderColor: '#f44336',
    borderWidth: 2,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  understoodButton: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#4caf50',
  },
  failButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
