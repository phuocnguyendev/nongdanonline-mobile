import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  name: Yup.string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[a-zA-Z\s]+$/, 'Họ và tên không được chứa ký tự đặc biệt'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email.'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu.'),
  phoneNumber: Yup.string()
    .required('Số điện thoại là bắt buộc')
    .test(
      'starts-with-0',
      'Số điện thoại phải bắt đầu bằng số 0',
      (value) => !!value && value.startsWith('0'),
    )
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số'),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email.'),
});

export const setNewPasswordValidationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, 'Mật khẩu phải ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu mới.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng nhập lại mật khẩu.'),
});

export const updateProfileValidationSchema = Yup.object({
  name: Yup.string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[a-zA-Z\s]+$/, 'Họ và tên không được chứa ký tự đặc biệt'),
  phone: Yup.string()
    .required('Số điện thoại là bắt buộc')
    .test(
      'starts-with-0',
      'Số điện thoại phải bắt đầu bằng số 0',
      (value) => !!value && value.startsWith('0'),
    )
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số'),
  address: Yup.string().required('Địa chỉ là bắt buộc'),
});

export const RegisterAddressFormPopup = Yup.object({
  name: Yup.string()
    .required('Họ và tên là bắt buộc')
    .matches(/^[a-zA-Z\s]+$/, 'Họ và tên không được chứa ký tự đặc biệt'),
  phone: Yup.string()
    .required('Số điện thoại là bắt buộc')
    .test(
      'starts-with-0',
      'Số điện thoại phải bắt đầu bằng số 0',
      (value) => !!value && value.startsWith('0'),
    )
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số'),
  address: Yup.string().required('Địa chỉ là bắt buộc'),
});

export const updatePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required(
    'Mật khẩu hiện tại không được để trống',
  ),
  newPassword: Yup.string()
    .matches(/[A-Z]/, 'Mật khẩu mới phải chứa ít nhất một chữ hoa')
    .matches(/[a-z]/, 'Mật khẩu mới phải chứa ít nhất một chữ thường')
    .matches(/[0-9]/, 'Mật khẩu mới phải chứa ít nhất một chữ số')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Mật khẩu mới phải chứa ít nhất một ký tự đặc biệt',
    )
    .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự')
    .required('Mật khẩu mới không được để trống'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Xác nhận mật khẩu không khớp')
    .required('Xác nhận mật khẩu không được để trống'),
});
