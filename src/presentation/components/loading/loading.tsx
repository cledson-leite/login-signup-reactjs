import React, { useContext } from 'react'
import Styles from './loading-styles.scss'

import Context from '@providers/form'

import Spinner from '@components/spinner/spinner'

const Loading: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context).loading
  return (
    <div className={Styles.errorWrap} data-testid ='errorWrap'>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage.trim() && <span data-testid="error" className={Styles.error}>{errorMessage}</span>}
      
    </div>
  )
}

export default Loading
