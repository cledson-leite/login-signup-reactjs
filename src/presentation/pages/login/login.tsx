import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'

import Logo from '@components/logo/logo'
import Input from '@components/input/input'
import Loading from '@components/loading/loading'

import Context from '@providers/form'

import Header from '@layout/header/header'
import Footer from '@layout/footer/footer'
import { Validation } from 'presentation/validation/IValidation'
import { Authentication } from '@usecases/Authentication'

type Props = {
  validation: Validation,
  authentication: Authentication
}


const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState({
    isLoading: false,
    errorMessage: "",
  })
  const [inputError, setInputError] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    setInputError({
      email: validation.validate('email', state.email),
      password: validation.validate('password', state.password)

    })
    
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (loading.isLoading || inputError.email || inputError.password) return
      setLoading({
        ...loading,
        isLoading: true,
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error: any) {
      setLoading({
        isLoading: false,
        errorMessage: error.message
      })
    }
  }
  
  return (
    <div className={Styles.login} >
      <Header />
      <Context.Provider value={{loading, inputError, state, setState}}>
        <form
          data-testid="form"
          onSubmit={handleSubmit}
          className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder='Digite seu e-mail ...'/>
          <Input type="password" name="password" placeholder='Digite sua senha ...' />
          
          <button
            data-testid='submit'
            disabled={!!inputError.email || !!inputError.password }
            type="submit"
          >
            Entrar
          </button>
          <Link
            data-testid="signUp"
            to="/signUp"
            className={Styles.link}
          >Criar conta</Link>
          <Loading />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
