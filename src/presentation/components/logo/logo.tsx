import React from 'react'

const Logo = () => {
  return (
    <img src="data:image/png;base64,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" alt="" />
  )
}

export default Logo
