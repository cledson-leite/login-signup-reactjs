import React, { useContext } from 'react'
import Context from '@providers/form'
import Styles from './input-styles.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { inputError } = useContext(Context)
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span
        data-testid={`${props.name}-status`}
        title={inputError[props.name!]}
        className={Styles.statusGreen}
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      {/* <span className={Styles.statusRed}><FontAwesomeIcon icon={faTimes} /></span> */}
    </div>
  )
}

export default Input
