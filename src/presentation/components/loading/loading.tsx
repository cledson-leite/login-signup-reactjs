import React, { useContext } from 'react'
import Styles from './loading-styles.scss'

import Context from '@providers/form'

import Spinner from '@components/spinner/spinner'

const Loading: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div className={Styles.errorWrap} data-testid ='errorWrap'>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage.trim() && <span className={Styles.error}>Error</span>}
      
    </div>
  )
}

export default Loading
