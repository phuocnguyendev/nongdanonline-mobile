import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFormik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { changeUserPassword } from '../../../api/user/user'
import { updatePasswordValidationSchema } from '../../../validation/Validation'

export const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (!token) {
          Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.')
          return
        }

        const decodedToken = jwtDecode(token)
        if (decodedToken?.id) {
          setUserId(decodedToken.id)
        } else {
          Alert.alert('Lỗi', 'Token không hợp lệ.')
        }
      } catch (error) {
        console.error('Error decoding token:', error)
        Alert.alert('Lỗi', 'Không thể đọc thông tin người dùng.')
      }
    }

    fetchUserId()
  }, [])

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: updatePasswordValidationSchema,
    onSubmit: async (values) => {
      if (!userId) {
        Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.')
        return
      }

      setIsLoading(true)

      try {
        const response = await changeUserPassword(userId, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        })

        if (response.statusCode === 200) {
          Alert.alert('Thành công', 'Cập nhật mật khẩu thành công')
          formik.resetForm()
        } else {
          Alert.alert(
            'Lỗi',
            response.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
          )
        }
      } catch (error) {
        console.error('Error updating password:', error)
        Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.')
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập Nhật Mật Khẩu</Text>
      <View style={styles.card}>
        {/* Current Password Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mật khẩu hiện tại</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.currentPassword && formik.errors.currentPassword
                ? styles.errorInput
                : null,
            ]}
            placeholder="Nhập mật khẩu hiện tại"
            secureTextEntry
            onChangeText={formik.handleChange('currentPassword')}
            onBlur={formik.handleBlur('currentPassword')}
            value={formik.values.currentPassword}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <Text style={styles.errorText}>
              {formik.errors.currentPassword}
            </Text>
          )}
        </View>

        {/* New Password Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mật khẩu mới</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.newPassword && formik.errors.newPassword
                ? styles.errorInput
                : null,
            ]}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <Text style={styles.errorText}>{formik.errors.newPassword}</Text>
          )}
        </View>

        {/* Confirm Password Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? styles.errorInput
                : null,
            ]}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Text style={styles.errorText}>
              {formik.errors.confirmPassword}
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={formik.handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cập Nhật Mật Khẩu</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f8fd',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d9e6',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9fafe',
  },
  errorInput: {
    borderColor: '#f05252',
  },
  errorText: {
    color: '#f05252',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#00a86b',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#d1d9e6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
})

export default UpdatePassword
