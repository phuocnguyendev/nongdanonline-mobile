import Ionicons from '@expo/vector-icons/Ionicons'
import { useHeaderHeight } from '@react-navigation/elements'
import { useState } from 'react'
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
import { postRegister } from '../../api/auth/index'

export function Register({ navigation }) {
  const headerHeight = useHeaderHeight()
  const dismissKeyboard = () => Keyboard.dismiss()
  const [inputFocused, setInputFocused] = useState(null)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isSamePassword, setIsSamePassword] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleChange = ({ key, value }) => {
    switch (key) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        setIsValidEmail(validateEmail(value))
        break
      case 'newPass':
        setNewPass(value)
        break
      case 'confirmPass':
        setConfirmPass(value)
        setIsSamePassword(value === newPass)
        break
      default:
        break
    }
  }

  const handleRegister = async () => {
    try {
      const data = {
        name: name,
        email: email,
        password: newPass,
        confirmPassword: confirmPass,
      }

      await postRegister(data)
      setIsSuccess(true)
      setModalVisible(true)
    } catch (error) {
      setIsSuccess(false)
      setModalVisible(true)
      console.error('Error:', error)
    }
  }

  const handleLogin = (nav) => {
    navigation.navigate(nav)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground
        source={require('../../assets/background2.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={{ paddingTop: headerHeight + 10, paddingBottom: 10 }}>
            <Text style={styles.topic}>
              Thiết lập tài khoản của bạn ngay bây giờ!
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={[
                styles.label,
                inputFocused === 'name' && styles.labelFocused,
              ]}
            >
              Họ và tên
            </Text>
            <View
              style={[
                styles.inputContainer,
                inputFocused === 'name' && styles.inputFocused,
              ]}
            >
              <TextInput
                value={name}
                onChangeText={(text) =>
                  handleChange({ key: 'name', value: text })
                }
                placeholder="Nhập họ và tên"
                style={styles.input}
                onFocus={() => setInputFocused('name')}
                onBlur={() => setInputFocused(null)}
              />
            </View>
          </View>

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
                value={email}
                placeholder="Nhập Email"
                onChangeText={(text) =>
                  handleChange({ key: 'email', value: text })
                }
                style={styles.input}
                onFocus={() => setInputFocused('email')}
                onBlur={() => setInputFocused(null)}
              />
            </View>
            {email && !isValidEmail && (
              <Text style={{ color: 'red', marginTop: 5 }}>
                Email không hợp lệ
              </Text>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={[
                styles.label,
                inputFocused === 'newPass' && styles.labelFocused,
              ]}
            >
              Mật khẩu
            </Text>
            <View
              style={[
                styles.inputContainer,
                inputFocused === 'newPass' && styles.inputFocused,
              ]}
            >
              <TextInput
                value={newPass}
                placeholder="Nhập mật khẩu"
                onChangeText={(text) =>
                  handleChange({ key: 'newPass', value: text })
                }
                style={styles.input}
                secureTextEntry={!showNewPassword}
                onFocus={() => setInputFocused('newPass')}
                onBlur={() => setInputFocused(null)}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.iconRight}
              >
                <Ionicons
                  name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="#4caf50"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={[
                styles.label,
                inputFocused === 'confirmPass' && styles.labelFocused,
              ]}
            >
              Xác nhận mật khẩu
            </Text>
            <View
              style={[
                styles.inputContainer,
                inputFocused === 'confirmPass' && styles.inputFocused,
              ]}
            >
              <TextInput
                value={confirmPass}
                placeholder="Xác nhận mật khẩu"
                onChangeText={(text) =>
                  handleChange({ key: 'confirmPass', value: text })
                }
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                onFocus={() => setInputFocused('confirmPass')}
                onBlur={() => setInputFocused(null)}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.iconRight}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="#4caf50"
                />
              </TouchableOpacity>
            </View>
            {confirmPass && !isSamePassword && (
              <Text style={{ color: 'red', marginTop: 5 }}>
                Mật khẩu phải trùng nhau
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.register} onPress={handleRegister}>
            <Text style={styles.registerText}>Đăng ký</Text>
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText}>Hoặc</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.login}
            onPress={() => handleLogin('Login')}
          >
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Close button (X icon) */}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              {/* Modal title */}
              {isSuccess ? (
                <Text style={[styles.modalTitle, { color: 'green' }]}>
                  Thông báo
                </Text>
              ) : (
                <Text style={[styles.modalTitle, { color: 'red' }]}>
                  Thông báo
                </Text>
              )}
              {/* Modal message */}
              <Text style={styles.modalMessage}>
                {isSuccess
                  ? 'Đăng ký thành công!'
                  : 'Đăng ký thất bại. Vui lòng thử lại.'}
              </Text>
              {/* "Đã hiểu" button */}
              <TouchableOpacity
                style={styles.understoodButton}
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
  topic: {
    textAlign: 'center',
    fontSize: 18,
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
  iconRight: {
    justifyContent: 'flex-end',
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
  register: {
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: '#2dcc6f',
    paddingVertical: 15,
    elevation: 4,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  lineText: {
    marginHorizontal: 10,
    color: 'gray',
    fontSize: 16,
  },
  login: {
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingVertical: 15,
    elevation: 4,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2dcc6f',
    fontWeight: 'bold',
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
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  understoodButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
