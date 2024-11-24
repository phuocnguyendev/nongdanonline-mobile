import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  getUserInfo,
  updateUserID,
  uploadUserAvatar,
} from '../../../api/user/user'

export function Info() {
  const [userData, setUserData] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const fetchUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      if (!token) return

      const decodedToken = jwtDecode(token)
      const userId = decodedToken.id

      const response = await getUserInfo(userId)

      setUserData(response.data)
      setSelectedImage(response.data.avatar)
    } catch (error) {
      console.error('Lỗi khi tải thông tin user:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const handleSave = async () => {
    if (!userData?.id) return
    setIsSaving(true)

    const phoneNumberPattern = /^0\d{9}$/
    if (!phoneNumberPattern.test(userData.phoneNumber)) {
      alert('Số điện thoại không hợp lệ. Vui lòng nhập lại.')
      setIsSaving(false)
      return
    }

    const updateProfilePromise = updateUserID(userData.id, {
      name: userData.name,
      phoneNumber: userData.phoneNumber,
    })

    let uploadAvatarPromise = Promise.resolve()

    if (selectedImage && selectedImage !== userData.avatar) {
      const formData = new FormData()
      formData.append('avatarFile', {
        uri: selectedImage,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      })

      uploadAvatarPromise = uploadUserAvatar(userData.id, formData)
    }

    try {
      const [updateProfileResponse, uploadAvatarResponse] = await Promise.all([
        updateProfilePromise,
        uploadAvatarPromise,
      ])

      if (updateProfileResponse?.statusCode === 200) {
        setUserData(updateProfileResponse.data)
        alert('Cập nhật thông tin người dùng thành công.')
      }

      if (uploadAvatarResponse?.statusCode === 200) {
        setUserData((prev) => ({
          ...prev,
          avatar: uploadAvatarResponse.data.avatar,
        }))
      }
    } catch (error) {
      console.error('Error updating user info:', error)
      alert('Có lỗi xảy ra khi cập nhật thông tin.')
    } finally {
      setIsSaving(false)
    }
  }

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Bạn cần cấp quyền truy cập thư viện ảnh để tiếp tục.')
      return
    }

    setLoading(true)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri

      const fileInfo = await fetch(selectedUri).then((res) => res.blob())
      const maxSizeInBytes = 1 * 1024 * 1024

      if (fileInfo.size > maxSizeInBytes) {
        alert('Kích thước file phải nhỏ hơn 1MB.')
        setLoading(false)
        return
      }

      setSelectedImage(selectedUri)
    }
    setLoading(false)
  }

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Hồ sơ của tôi</Text>
        <Text style={styles.subtitle}>
          Quản lí thông tin hồ sơ để bảo mật tài khoản
        </Text>

        <View style={styles.viewInput}>
          <View style={styles.info}>
            <Text style={styles.label}>Tên</Text>
            <TextInput
              value={userData?.name || ''}
              onChangeText={(text) =>
                setUserData((prev) => ({ ...prev, name: text }))
              }
              style={styles.textInput}
              placeholder="Nhập tên của bạn"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Email</Text>
            <Text style={[styles.emailText]}>{userData?.email || ''}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              value={userData?.phoneNumber || ''}
              onChangeText={(text) =>
                setUserData((prev) => ({ ...prev, phoneNumber: text }))
              }
              keyboardType="phone-pad"
              style={styles.textInput}
              placeholder="Nhập số điện thoại của bạn"
            />
          </View>
        </View>

        <View style={styles.uploadImage}>
          {loading ? (
            <ActivityIndicator size="large" color="#16a34a" />
          ) : (
            <>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.profileImage}
                />
              )}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#1d4ed8' }]}
                onPress={openImagePicker}
              >
                <Text style={styles.buttonText}>Chọn Ảnh</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Dung lượng file tối đa 1Mb</Text>
              <Text style={styles.text}>Định dạng: JPEG, PNG.</Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#00a86b' }]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>
                  {isSaving ? 'Đang lưu...' : 'Lưu'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  viewInput: {
    width: '100%',
    marginBottom: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '30%',
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  emailText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  uploadImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#00a86b',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
