import React from 'react'
import Styles from './loading-styles.scss'

import Spinner from '@components/spinner/spinner'

const Loading = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  )
}

export default Loading
