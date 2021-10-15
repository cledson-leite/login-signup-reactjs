import React, { useState } from 'react'
import Styles from './login-styles.scss'

import Logo from '@components/logo/logo'
import Input from '@components/input/input'
import Loading from '@components/loading/loading'

import Context from '@providers/form'

import Header from '@layout/header/header'
import Footer from '@layout/footer/footer'


const Login: React.FC = () => {
  const [loading] = useState({
    isLoading: false,
    errorMessage: "",
  })
  const [inputError] = useState({
    email: "Campo Obrigatório",
    password: "Campo Obrigatório",
  })
  return (
    <div className={Styles.login} >
      <Header />
      <Context.Provider value={{loading, inputError}}>
        <form action="" className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder='Digite seu e-mail ...'/>
          <Input type="password" name="password" placeholder='Digite sua senha ...' />
          
          <button data-testid='submit' disabled type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <Loading />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
