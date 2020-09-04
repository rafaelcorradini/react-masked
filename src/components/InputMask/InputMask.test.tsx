import React from 'react'
import '../../setupEnzyme'
import { mount } from 'enzyme'
import InputMask from './InputMask'

it('should render component', () => {
  const wrapper = mount(<InputMask mask='999.999.999-99' />)
  expect(wrapper.isEmptyRender()).toBe(false)
})

it('should format value with default patterns', () => {
  const wrapper = mount(<InputMask mask='999.999.999-99' />)
  wrapper.find('input').instance().value = '12312312333'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('123.123.123-33')
})

it('should format value with custom patterns and remove default patterns', () => {
  const wrapper = mount(
    <InputMask mask='aaa.aaa.aaa-aa99' patterns={{ a: new RegExp('[0-9]') }} />
  )
  wrapper.find('input').instance().value = '12312312333aa'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('123.123.123-3399')
})

it('should format value with added patterns and default patterns merged', () => {
  const wrapper = mount(
    <InputMask mask='aaa.aaa.aaa-99' addPatterns={{ a: new RegExp('[0-9]') }} />
  )
  wrapper.find('input').instance().value = '12312312333'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('123.123.123-33')
})

it('should clear value on blur', () => {
  const wrapper = mount(<InputMask mask='999.999.999-99' clearIfNotMatch />)
  wrapper.find('input').instance().value = '1231231233'
  wrapper.simulate('change')
  wrapper.simulate('blur')
  expect(wrapper.find('input').instance().value).toBe('')
})

it('should clear not clear value on blur', () => {
  const wrapper = mount(<InputMask mask='999.999.999-99' />)
  wrapper.find('input').instance().value = '1231231233'
  wrapper.simulate('change')
  wrapper.simulate('blur')
  expect(wrapper.find('input').instance().value).toBe('123.123.123-3')
})

it('should call onChange after change value', () => {
  const mockFn: jest.Mock = jest.fn()
  const wrapper = mount(
    <InputMask mask='999.999.999-99' clearIfNotMatch onChange={mockFn} />
  )
  wrapper.find('input').instance().value = '12312312333'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('123.123.123-33')
  expect(mockFn).toHaveBeenCalled()
})

it('should call onBlur', () => {
  const mockFn: jest.Mock = jest.fn()
  const wrapper = mount(
    <InputMask mask='999.999.999-99' clearIfNotMatch onBlur={mockFn} />
  )
  wrapper.find('input').instance().value = '12312'
  wrapper.simulate('change')
  wrapper.simulate('blur')
  expect(wrapper.find('input').instance().value).toBe('')
  expect(mockFn).toHaveBeenCalled()
})
