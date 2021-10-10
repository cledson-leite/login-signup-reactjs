import React from 'react'
import Styles from './login-styles.scss'

import Logo from '@components/logo/logo'
import Input from '@components/input/input'
import Spinner from '@components/spinner/spinner'

import Header from '@layout/header/header'
import Footer from '@layout/footer/footer'

const Login = () => {
  return (
    <div className={Styles.login} >
      <Header />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        
        <Input type="email" name="email" placeholder='Digite seu e-mail ...'/>
        <Input type="password " name="password " placeholder='Digite sua senha ...' />
        
        <button type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
