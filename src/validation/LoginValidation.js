import * as Yup from 'yup'

const getLoginValidationSchema = (t) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.requiredEmail')),
    password: Yup.string()
      .min(1, t('validation.minPassword'))
      .required(t('validation.requiredPassword')),
  })

export default getLoginValidationSchema
