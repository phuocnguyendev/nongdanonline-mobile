import * as Yup from 'yup';

const getLoginValidationSchema = (): Yup.ObjectSchema<{
  email: string;
  password: string;
}> =>
  Yup.object().shape({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    password: Yup.string()
      .min(1, 'Mật khẩu phải có ít nhất 1 ký tự')
      .required('Mật khẩu là bắt buộc'),
  });

export default getLoginValidationSchema;
