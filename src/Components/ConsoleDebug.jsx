import React from 'react'

const ConsoleDebug = ({componentName}) => {
  return (
    <div>{console.log(`<${componentName}/>`)}</div>
  )
}

export default ConsoleDebug