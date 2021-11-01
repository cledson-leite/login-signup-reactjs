import React, { useContext } from 'react'
import Context from '@providers/form'
import Styles from './input-styles.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { inputError, state, setState } = useContext(Context)
  const enabledInput = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.readOnly = false
  }
  const handleChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onChange={handleChange}
        onFocus={enabledInput}
      />
      <span
        data-testid={`${props.name}-status`}
        title={
          inputError[props.name!].trim()
            ? inputError[props.name!]
            : 'OK!'
        }
        className={
          inputError[props.name!].trim()
            ? Styles.statusRed
            : Styles.statusGreen
        }
      >
        {
          inputError[props.name!].trim()
            ? <FontAwesomeIcon icon={faTimes} />
            : <FontAwesomeIcon icon={faCheck} />
        }

      </span>
    </div>
  )
}

export default Input
