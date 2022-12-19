import { useQuery } from '@tanstack/react-query'
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../customHookApi/CustomHookApi'
import styleForm from './style.module.scss'

export const SIGNIN_QUERY_KEY = ['SIGNIN_QUERY_KEY']

export function User() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/signIn/form')
  }, [])
  const getSignIn = (email, password) => api.signIn(email, password)
    .then((data) => {
      console.log(data)
      if (data.token) {
        localStorage.setItem('userToken', data.token)
        navigate('/catalog')
      } else {
        alert('Вы ввели неверные данные')
      }
    })
    .catch((error) => console.error(error.message))

  function signIn(values) {
    const { data } = useQuery(
      { queryKey: SIGNIN_QUERY_KEY, queryFn: getSignIn(values.email, values.password) },
    )
    return data
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Невалидный email адрес')
          .required('Поле обязательно к заполнению'),
        password: Yup.number()
          .required('Поле обязательно к заполнению'),
      })}
      onSubmit={(values) => {
        signIn(values)
      }}
    >
      <Form
        className={styleForm.form__inputs}
      >
        <Field name="email" key="email" type="text" placeholder="Email" />
        <ErrorMessage name="email" />

        <Field name="password" key="password" type="password" placeholder="Пароль" />
        <ErrorMessage name="password" />

        <button type="submit">Вход</button>
        <Link className={styleForm.home} to="/">Назад</Link>
        <Link className={styleForm.home} to="/signup/form">Регистрация</Link>
      </Form>
    </Formik>
  )
}
