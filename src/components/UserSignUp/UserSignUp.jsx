import { useMutation } from '@tanstack/react-query'
import {
  Field, Formik, Form, ErrorMessage,
} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { queryClient } from '../..'
import { api } from '../customHookApi/CustomHookApi'
import styleForm from './style.module.scss'

const SIGNUP_USER = ['SIGNUP_USER']

export function UsersignUp() {
  const navigate = useNavigate()

  const getSignUp = (email, password, group) => api.signUp(email, password, group)
    .then((data) => {
      console.log(data)
      if (data) {
        navigate('/signin/form')
      } else {
        navigate('/signup/form')
      }
    })

  const { mutateAsync } = useMutation({
    mutationFn: (values) => getSignUp(values.email, values.password, values.group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIGNUP_USER })
    },
  })

  const signup = async (email, password, group) => {
    await mutateAsync(email, password, group)
    if (mutateAsync.isLoading) {
      return <span>Loading</span>
    }
    if (mutateAsync.isError) {
      return (
        <span>
          Error
          {mutateAsync.error.message}
        </span>
      )
    }
    return mutateAsync.isSucces
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        group: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Невалидный email адрес')
          .required('Поле обязательно к заполнению'),
        password: Yup.number()
          .required('Поле обязательно к заполнению'),
        group: Yup.string()
          .max(20, 'Превышено максимальное клоичество символов')
          .required('Поле обязательно к заполнению'),
      })}
      onSubmit={(values) => {
        signup(values)
      }}
    >
      <Form
        className={styleForm.form__inputs}
      >
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" />

        <Field name="group" type="text" placeholder="Группа" />
        <ErrorMessage name="group" />

        <Field name="password" type="password" placeholder="Пароль" />
        <ErrorMessage name="password" />

        <button type="submit">Регистрация</button>
        <Link className={styleForm.home} to="/">Главная</Link>
        <button type="button">
          <Link className={styleForm.home} to="/signin/form">Авторизация</Link>
        </button>
      </Form>
    </Formik>
  )
}
