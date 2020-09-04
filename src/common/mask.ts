import { defaultPatterns } from './defaultPatterns'

/**
 * checks if the char is a pattern, that is, if is a pattern
 * @param char value to check
 * @param patterns the mask rules
 * @returns true is a pattern, false if is not
 */
export function isPattern(char: string, patterns: any): boolean {
  for (const key in patterns) {
    if (Object.prototype.hasOwnProperty.call(patterns, key) && key === char) {
      return true
    }
  }
  return false
}

/**
 * Fits the value with the mask and return a formatted value
 * @param value value to fit
 * @param mask mask used on fit
 * @param patterns the mask rules
 * @returns masked value
 */
export function fitToMask(
  value: string,
  mask: string,
  patterns: any = defaultPatterns
): string {
  let newValue = ''
  // value size adjust to mask size
  const size: number = getMaskSize(mask)
  value = value.substring(0, size)

  for (let i = 0, j = 0; j < mask.length && i < value.length; i++, j++) {
    // ignore next special char
    if (mask[j] === '\\') {
      newValue += mask[j + 1]
      j++
      continue
    }
    // test special char
    if (isPattern(mask[j], patterns)) {
      if (patterns[mask[j]].test(value[i])) {
        newValue += value[i]
      } else {
        return newValue
      }
    } else {
      newValue += mask[j]
      if (mask[j] !== value[i]) {
        i--
      }
    }
  }
  return newValue
}

/**
 * Checks if the value matches with the mask and is completed
 * @param value value to check
 * @param mask mask to check if match
 * @returns true if match, false if not match
 */
export function isMatchingMask(value: string, mask: string): boolean {
  // value size adjust to mask size
  const size: number = getMaskSize(mask)
  value = value.substring(0, size)

  return value.length === size
}

/**
 * Fits the value with the currency mask
 * @param value value to fit
 * @param precision decimal precision
 * @param decimal decimal separator
 * @param thousand thousands separator
 * @param prefix string to show on value start
 * @param suffix string to show on value end
 * @returns true if match, false if not match
 */
export function fitToCurrency(
  value: string,
  precision: number,
  decimal: string,
  thousand?: string,
  prefix?: string,
  suffix?: string,
  max?: number,
  min?: number
): string {
  const number: string = Number(value.replace(/[^0-9]/g, '')).toString()
  let realNumber: number
  let newValue = ''

  realNumber = Number(number) / 10 ** precision

  if (max !== undefined && realNumber > max) realNumber = max
  if (min !== undefined && realNumber < min) realNumber = min

  newValue = realNumber.toLocaleString('en', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })

  newValue = newValue
    .replace('.', 'X')
    .replace(/,/g, thousand || '')
    .replace('X', decimal)

  if (prefix) {
    newValue = `${prefix} ${newValue}`
  }

  if (suffix) {
    newValue = `${newValue} ${suffix}`
  }

  return newValue
}

function getMaskSize(mask: string): number {
  return mask.replace(/\\(?!\\)/g, '').length
}
