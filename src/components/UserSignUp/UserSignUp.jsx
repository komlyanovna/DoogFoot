import { useQuery } from '@tanstack/react-query'
import {
  Field, Formik, Form, ErrorMessage,
} from 'formik'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../customHookApi/CustomHookApi'
import styleForm from './style.module.scss'

const SIGNUP_USER = ['SIGNUP_USER']

export function UsersignUp() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/signup/form')
  }, [])

  const getSignUp = (email, password, group) => api.signUp(email, password, group)
    .then(() => navigate('/signin/form'))

  function signup(values) {
    const { data } = useQuery(
      { queryKey: SIGNUP_USER, queryFn: getSignUp(values.email, values.password, values.group) },
    )
    return data
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
        // api.signUp(values.email, values.password, values.group)
        signup(values)
      }}
    >
      <Form
        className={styleForm.form__inputs}
      >
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" />

        <Field name="password" type="password" placeholder="Пароль" />
        <ErrorMessage name="password" />

        <Field name="group" type="text" placeholder="Группа" />
        <ErrorMessage name="group" />

        <button type="submit">Регистрация</button>
        <Link className={styleForm.home} to="/">Главная</Link>
        <button type="button">
          <Link className={styleForm.home} to="/signin/form">Авторизация</Link>
        </button>
      </Form>
    </Formik>
  )
}
