import React from 'react'
import '../../setupEnzyme'
import { mount } from 'enzyme'
import InputCurrency from './InputCurrency'

it('should render component', () => {
  const wrapper = mount(<InputCurrency />)
  expect(wrapper.isEmptyRender()).toBe(false)
})

it('should format value with default', () => {
  const wrapper = mount(<InputCurrency />)
  wrapper.find('input').instance().value = '100000'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('1000.00')
})

it('should format value with thousand', () => {
  const wrapper = mount(<InputCurrency thousand=',' />)
  wrapper.find('input').instance().value = '100000'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('1,000.00')
})

it('should format value with decimal', () => {
  const wrapper = mount(<InputCurrency thousand='.' decimal=',' />)
  wrapper.find('input').instance().value = '100000'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('1.000,00')
})

it('should respect max value', () => {
  const wrapper = mount(<InputCurrency max={1000} />)
  wrapper.find('input').instance().value = '100000'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('1000.00')
})

it('should respect min value', () => {
  const wrapper = mount(<InputCurrency min={10} />)
  wrapper.find('input').instance().value = '5'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('10.00')
})

it('should format with prefix', () => {
  const wrapper = mount(<InputCurrency prefix='R$' />)
  wrapper.find('input').instance().value = '5'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('R$ 0.05')
})

it('should format with suffix', () => {
  const wrapper = mount(<InputCurrency suffix='BRL' />)
  wrapper.find('input').instance().value = '5'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('0.05 BRL')
})

it('should format with bolth prefix and suffix', () => {
  const wrapper = mount(<InputCurrency prefix='R$' suffix='BRL' />)
  wrapper.find('input').instance().value = '5'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('R$ 0.05 BRL')
})

it('should have tel type by default', () => {
  const wrapper = mount(<InputCurrency />)
  expect(wrapper.find('input').instance().type).toBe('tel')
})

it('should call onChange after change value', () => {
  const mockFn: jest.Mock = jest.fn()
  const wrapper = mount(<InputCurrency onChange={mockFn} />)
  wrapper.find('input').instance().value = '12312312333'
  wrapper.simulate('change')
  expect(wrapper.find('input').instance().value).toBe('123123123.33')
  expect(mockFn).toHaveBeenCalled()
})
