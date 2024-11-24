import { useFormik } from 'formik'
import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { postRegister } from '../../api/auth/auth'
import { signUpValidationSchema } from '../../validation/Validation'

export const Register = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await postRegister({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          phoneNumber: values.phoneNumber,
        })
        if (response?.statusCode === 200) {
          Toast.show({
            type: 'success',
            text1: 'Đăng ký thành công!',
            text2: 'Vui lòng kiểm tra địa chỉ email để xác nhận tài khoản.',
          })
          setTimeout(() => {
            navigation.navigate('Login')
          }, 2000) // Chuyển hướng sau 3 giây để người dùng đọc thông báo
        } else {
          Toast.show({
            type: 'error',
            text1: 'Lỗi đăng ký',
            text2: response?.message || 'Đăng ký không thành công.',
          })
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi hệ thống',
          text2: error.response?.data?.message || 'Đã xảy ra lỗi.',
        })
      }
    },
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.subtitle}>
          Chúng tôi sẽ thiết lập mọi thứ để bạn có thể truy cập vào tài khoản cá
          nhân của mình.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.error}>{formik.errors.name}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          keyboardType="email-address"
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange('phoneNumber')}
          onBlur={formik.handleBlur('phoneNumber')}
          keyboardType="phone-pad"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <Text style={styles.error}>{formik.errors.phoneNumber}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          secureTextEntry
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Bạn đã có tài khoản?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}
          >
            Đăng nhập
          </Text>
        </Text>
      </View>

      <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2Ffarm_1.gif?alt=media&token=f14f9a0f-cda3-42cf-9701-56c613cf6e79',
        }}
        style={styles.image}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#34d399',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#555',
  },
  link: {
    color: '#34d399',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
})

export default Register
