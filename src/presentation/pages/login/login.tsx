import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'

import Logo from '@components/logo/logo'
import Input from '@components/input/input'
import Loading from '@components/loading/loading'

import Context from '@providers/form'

import Header from '@layout/header/header'
import Footer from '@layout/footer/footer'
import { Validation } from 'presentation/validation/IValidation'

type Props = {
  validation: Validation
}


const Login: React.FC<Props> = ({validation}: Props) => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setLoading({
      ...loading,
      isLoading: true,
    })
  }
  
  return (
    <div className={Styles.login} >
      <Header />
      <Context.Provider value={{loading, inputError, state, setState}}>
        <form
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
          <span className={Styles.link}>Criar conta</span>
          <Loading />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
