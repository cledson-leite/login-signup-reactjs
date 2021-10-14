import React, { useState } from 'react'
import Styles from './login-styles.scss'

import Logo from '@components/logo/logo'
import Input from '@components/input/input'
import Loading from '@components/loading/loading'

import Context from '@providers/form'

import Header from '@layout/header/header'
import Footer from '@layout/footer/footer'


const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: "",
  })
  return (
    <div className={Styles.login} >
      <Header />
      <Context.Provider value={state}>
        <form action="" className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder='Digite seu e-mail ...'/>
          <Input type="password " name="password " placeholder='Digite sua senha ...' />
          
          <button type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <Loading />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
