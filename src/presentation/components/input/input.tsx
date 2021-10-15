import React, { useContext } from 'react'
import Context from '@providers/form'
import Styles from './input-styles.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { inputError } = useContext(Context)
  const enabledInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.readOnly = false;
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={ enabledInput }/>
      <span
        data-testid={`${props.name}-status`}
        title={inputError[props.name!]}
        className={Styles.statusRed}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
      {/* <span className={Styles.statusRed}><FontAwesomeIcon icon={faCheck} /></span> */}
    </div>
  )
}

export default Input
