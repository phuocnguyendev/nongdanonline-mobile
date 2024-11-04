import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { postLogin } from '../../api/auth/index'
import CustomButton from '../../components/ui/Button/CustomButton'
import SocialLoginButton from '../../components/ui/Button/SocialLoginButton'
import InputField from '../../components/ui/InputField/InputField'
import useTranslationSwitcher from '../../hooks/useTranslationSwitcher'
import { setUser } from '../../store/userSlice'
import getLoginValidationSchema from '../../validation/LoginValidation'

export function Login({ navigation }) {
  const { t } = useTranslationSwitcher()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)

  const toggleCheckbox = () => setChecked(!checked)
  const dismissKeyboard = () => Keyboard.dismiss()
  const validation = getLoginValidationSchema(t)
  const loginApple = () => {
    Alert.alert(t('login.appleSignInMessage'), '', [{ text: t('login.ok') }])
  }

  const handleLogin = async (values) => {
    try {
      const response = await postLogin(values)
      const { token, refreshToken } = response.data

      const decodedToken = jwtDecode(token)
      const userInfo = {
        role: decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
        name: decodedToken.name,
        email: decodedToken.sub,
        avatar: decodedToken.avatar,
      }
      if (userInfo.role === 'User') {
        await AsyncStorage.setItem('accessToken', token)
        await AsyncStorage.setItem('refreshToken', refreshToken)
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        dispatch(setUser(userInfo))
        navigation.navigate('Main Screen')
      } else {
        Alert.alert(t('login.signInFailed'))
      }
    } catch (error) {
      console.error('Login Error:', error)
      Alert.alert(t('login.signInFailed'))
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <ImageBackground
              source={require('../../assets/Background.png')}
              style={styles.background}
              resizeMode="cover"
              blurRadius={5}
            />
            <SafeAreaView>
              <Image
                source={require('../../assets/LOGOOFFICIAL-01.png')}
                style={styles.image}
              />
            </SafeAreaView>
          </View>

          <View style={styles.loginView}>
            <View style={styles.login}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validation}
                onSubmit={handleLogin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    {/* Email Field */}
                    <InputField
                      label={t('login.email')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="john.doe@gmail.com"
                      onBlur={handleBlur('email')}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.invalid}>{errors.email}</Text>
                    )}

                    {/* Password Field */}
                    <InputField
                      label={t('login.password')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      placeholder={t('login.password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!showPassword}
                      toggleVisibility={() => setShowPassword(!showPassword)}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.invalid}>{errors.password}</Text>
                    )}

                    <View style={styles.optionsContainer}>
                      <View style={styles.rememberContainer}>
                        <Pressable onPress={toggleCheckbox}>
                          <Text>
                            {checked ? '☑️' : '⬜️'} {t('login.autoLogin')}
                          </Text>
                        </Pressable>
                      </View>
                      <Pressable
                        onPress={() => navigation.navigate('Forgot Password')}
                      >
                        <Text style={styles.forgotText}>
                          {t('login.forgotPassword')}
                        </Text>
                      </Pressable>
                    </View>

                    <CustomButton
                      onPress={handleSubmit}
                      title={t('login.signIn')}
                    />
                  </>
                )}
              </Formik>

              <Text style={styles.registerText}>
                {t('login.noAccount')}{' '}
                <Text
                  onPress={() => navigation.navigate('Register')}
                  style={styles.registerLink}
                >
                  {t('login.register')}
                </Text>
              </Text>

              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.lineText}>{t('login.or')}</Text>
                <View style={styles.line} />
              </View>

              <SocialLoginButton
                onPress={handleLogin}
                icon={require('../../assets/google.png')}
                title={t('login.signInWithGoogle')}
              />
              <SocialLoginButton
                onPress={loginApple}
                icon={require('../../assets/apple.png')}
                title={t('login.signInWithApple')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  imageView: {
    height: Dimensions.get('window').height * 0.4,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.12,
    alignSelf: 'center',
  },
  loginView: {
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.15,
    left: 0,
    right: 0,
    flex: 1,
  },
  login: {
    padding: 26,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 8,
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
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  labelFocused: {
    color: '#4caf50',
  },
  input: {
    padding: 2,
    flex: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    fontSize: 14,
  },
  forgotText: {
    fontSize: 14,
    color: 'red',
  },
  primaryButton: {
    backgroundColor: '#2dcc6f',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  registerLink: {
    color: '#2dcc6f',
    fontSize: 16,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
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
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 30,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  signInThird: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logo: {
    width: 24,
    height: 24,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -10,
  },
  invalid: {
    color: 'red',
    marginTop: 5,
  },
})

export default Login
