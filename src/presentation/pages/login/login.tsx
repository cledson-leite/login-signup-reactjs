import React from 'react'
import Styles from './login-styles.scss'

import Spinner from '@components/spinner/spinner'
import Logo from '@components/logo/logo'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  return (
    <div className={Styles.login} >
      <header className={Styles.header}>
        <Logo />
        <h2>Estudo de Caso Login e SignUp com TDD</h2>
      </header>
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder='Digite seu e-mail ...' />
          <span className={Styles.statusGreen} ><FontAwesomeIcon icon={faCheck} /></span>
          {/* <span className={Styles.statusRed}><FontAwesomeIcon icon={faTimes} /></span> */}
        </div>
        <div className={Styles.inputWrap}>
          <input type="password " name="password " placeholder='Digite sua senha ...' />
          <span className={Styles.statusGreen} ><FontAwesomeIcon icon={faCheck} /></span>
          {/* <span className={Styles.statusRed}><FontAwesomeIcon icon={faTimes} /></span> */}
        </div>
        <button type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <footer className={Styles.footer}/>
    </div>
  )
}

export default Login
