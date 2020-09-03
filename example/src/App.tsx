import React from 'react'

import { InputMask } from 'react-masked'

const App = () => {
  return (
    <div>
      <InputMask mask="999.999.999-99" clearIfNotMatch />
    </div>
  )
}

export default App
