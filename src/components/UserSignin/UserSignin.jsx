/* eslint-disable dot-notation */
import { useMutation } from '@tanstack/react-query'
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { queryClient } from '../..'
import { addUser } from '../../redux-toolkit/slices/userSlice/userSlice'
import { api } from '../customHookApi/CustomHookApi'
import styleForm from './style.module.scss'

export const SIGNIN_QUERY_KEY = ['SIGNIN_QUERY_KEY']

export function User() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/signIn/form')
  }, [])

  const dispatch = useDispatch()

  const getSignIn = (email, password) => api.signIn(email, password)
    .then((data) => {
      if (data.token) {
        dispatch(addUser(data.token))
        localStorage.setItem('userToken', data.token)
        // localStorage.setItem('userId', data.data['_id'])
        navigate('/catalog')
      } else {
        alert('Вы ввели неверные данные')
      }
    })

  const { mutateAsync } = useMutation({
    mutationFn: (values) => getSignIn(values.email, values.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIGNIN_QUERY_KEY })
    },
  })

  const signIn = async (email, password) => {
    await mutateAsync({ email, password })
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

  // console.log(!token)

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
        signIn(values.email, values.password)
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
