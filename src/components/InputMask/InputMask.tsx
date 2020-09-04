import * as React from 'react'
import { useCallback, forwardRef } from 'react'
import { defaultPatterns } from '../../common/defaultPatterns'
import { fitToMask, isMatchingMask } from '../../common/mask'

interface Props {
  mask: string
  clearIfNotMatch?: boolean
  patterns?: any
  addPatterns?: any
  onChange?: React.EventHandler<React.ChangeEvent>
  children?: React.ReactNode
  onBlur?: React.EventHandler<React.ChangeEvent>
}

const InputMask: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    mask,
    patterns = defaultPatterns,
    addPatterns,
    clearIfNotMatch,
    onChange,
    onBlur,
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
      event.currentTarget.value = fitToMask(event.currentTarget.value, mask, {
        ...patterns,
        ...addPatterns
      })
      if (onChange) onChange(event)
    },
    [mask, patterns, addPatterns, onChange]
  )

  /**
   * onBlur callback
   * when clearIfNotMatch is true will check if the mask is matching, otherwise the value will cleared
   */
  const handleOnBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (clearIfNotMatch && !isMatchingMask(event.currentTarget.value, mask)) {
        event.currentTarget.value = ''
      }

      if (onBlur) onBlur(event)
    },
    [mask, patterns, addPatterns, clearIfNotMatch, onBlur]
  )

  return (
    <input
      {...rest}
      ref={ref}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export default forwardRef<HTMLInputElement, Props>(InputMask)
