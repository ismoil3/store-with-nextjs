import React from 'react'

const Container = ({children}) => {
  return (
    <div style={{maxWidth:"1490px",margin:"auto"}} >
        {children}
    </div>
  )
}

export default Container