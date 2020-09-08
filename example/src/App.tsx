import React, { useState } from 'react'
import './index.css'
import { InputMask, InputCurrency } from 'react-masked'

const App = () => {
  const [value, setValue] = useState('')
  const [number, setNumber] = useState('')

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
      <InputCurrency
        precision={4}
        thousand="."
        decimal=","
        max={1000}
        prefix="R$"
        suffix="BRL"
        value={number}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNumber(event.currentTarget.value)}
      />
      <InputMask
        mask="999.999.999-99"
        clearIfNotMatch
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
      />
    </div>
  )
}

export default App
