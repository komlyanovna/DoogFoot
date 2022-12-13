import { Field, Form, Formik } from 'formik'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../customHookApi/CustomHookApi'
import styleForm from './style.module.scss'

export function User() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/signIn/form')
  }, [])

  const handleChange = () => {
    if (localStorage.getItem('userToken')) {
      console.log(localStorage.getItem('userToken'))
      navigate('/catalog')
    } else {
      navigate('/signin/form')
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      // validationSchema={}
      onSubmit={(values) => {
        api.signIn(values.email, values.password)
        handleChange()
        // api.examination()
      }}
    >
      <Form
        className={styleForm.form__inputs}
      >
        <Field name="email" type="text" placeholder="Email" />
        <Field name="password" type="password" placeholder="Пароль" />
        <button type="submit">Вход</button>
        <Link className={styleForm.home} to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
      </Form>
    </Formik>
  )
}
