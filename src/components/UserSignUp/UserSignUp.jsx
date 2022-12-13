import { Field, Formik, Form } from 'formik'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../customHookApi/CustomHookApi'
import styleForm from './style.module.scss'

export function UsersignUp() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/signup/form')
  }, [])

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        group: '',
      }}
    // validationSchema={}
      onSubmit={(values) => {
        api.signUp(values.email, values.password, values.group)
      }}
    >
      <Form
        className={styleForm.form__inputs}
      >
        <Field name="email" type="email" placeholder="Email" />
        <Field name="password" type="password" placeholder="Пароль" />
        <Field name="group" type="text" placeholder="Группа" />
        <button type="submit">Регистрация</button>
        <Link className={styleForm.home} to="/">Главная</Link>
      </Form>
    </Formik>
  )
}
