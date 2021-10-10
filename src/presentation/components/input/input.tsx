import React from 'react'
import Styles from './input-styles.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span className={Styles.statusGreen} ><FontAwesomeIcon icon={faCheck} /></span>
      {/* <span className={Styles.statusRed}><FontAwesomeIcon icon={faTimes} /></span> */}
    </div>
  )
}

export default Input
