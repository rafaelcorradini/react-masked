import React from 'react'
import './index.css'
import { InputMask, InputCurrency } from 'react-masked'

const App = () => {
  return (
    <div className="container">
      <InputMask mask="999.999.999-99" clearIfNotMatch />
      <InputCurrency />
      <InputCurrency thousand="." decimal="," />
      <InputCurrency
        precision={4}
        thousand="."
        decimal=","
        max={1000}
        prefix="R$"
        suffix="BRL"
      />
    </div>
  )
}

export default App
