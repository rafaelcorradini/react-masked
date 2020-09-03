import { isMatchingMask, fitToMask, isPattern } from './mask'

it('should indetify a pattern', () => {
  const patterns = {
    a: new RegExp('[0-9]')
  }
  expect(isPattern('a', patterns)).toBe(true)
  expect(isPattern('2', patterns)).toBe(false)
})

it('should fit the value in a mask', () => {
  const patterns = {
    '5': new RegExp('[0-9]')
  }
  expect(fitToMask('12341234', '5555', patterns)).toBe('1234')
  expect(fitToMask('12as', '5555', patterns)).toBe('12')
  expect(fitToMask('12-33', '55-55', patterns)).toBe('12-33')
  expect(fitToMask('12345', '55-55', patterns)).toBe('12-34')
})

it('should ignore pattern with \\', () => {
  const patterns = {
    '5': new RegExp('[0-9]')
  }
  expect(fitToMask('12341234', '555\\5', patterns)).toBe('1235')
})

it('should fit the value in a mask using default patterns', () => {
  expect(fitToMask('12341234', '9999')).toBe('1234')
  expect(fitToMask('12as', '9999')).toBe('12')
  expect(fitToMask('12345', '99-99')).toBe('12-34')
})

it('should verify if the value is matching the full mask', () => {
  expect(isMatchingMask('1234', '9999')).toBe(true)
  expect(isMatchingMask('12', '9999')).toBe(false)
})
