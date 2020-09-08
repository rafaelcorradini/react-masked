import * as React from 'react'
import { useCallback, forwardRef } from 'react'
import { fitToCurrency } from '../../common/mask'

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  onChange?: React.EventHandler<React.ChangeEvent>
  children?: React.ReactNode
  onBlur?: React.EventHandler<React.ChangeEvent>
  precision?: number
  prefix?: string
  suffix?: string
  thousand?: string
  decimal?: string
  max?: number
  min?: number
  type?: string
}

const InputCurrency: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    precision = 2,
    prefix,
    suffix,
    thousand,
    decimal = '.',
    onChange,
    onBlur,
    max,
    min,
    type = 'tel',
    ...rest
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  /**
   * onChange callback
   * fit the value to mask
   */
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = fitToCurrency(
        event.currentTarget.value,
        precision,
        decimal,
        thousand,
        prefix,
        suffix,
        max,
        min
      )
      event.currentTarget.value = newValue
      if (suffix) {
        event.currentTarget.selectionStart = event.currentTarget.selectionEnd =
          newValue.length - suffix.length - 1
      }
      if (onChange) onChange(event)
    },
    [precision, prefix, suffix, thousand, decimal, max, min]
  )

  return <input {...rest} type={type} ref={ref} onChange={handleOnChange} />
}

export default forwardRef<HTMLInputElement, Props>(InputCurrency)
