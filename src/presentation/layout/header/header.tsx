import React, { memo } from 'react'
import Styles from './header-styles.scss'

import Logo from '@components/logo/logo'

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h2>Estudo de Caso Login e SignUp com TDD</h2>
    </header>
  )
}

export default memo(Header)
