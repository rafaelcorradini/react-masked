# react-mask

> Input and text mask for React

[![NPM](https://img.shields.io/npm/v/react-mask.svg)](https://www.npmjs.com/package/react-mask) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rafaelcorradini/react-mask/master/LICENSE)
[![Build Status](https://travis-ci.com/rafaelcorradini/react-mask.svg?branch=master)](https://travis-ci.com/rafaelcorradini/react-mask)

## Install

```bash
npm install --save react-mask
```

## Usage


### mask prop
```jsx
<InputMask mask="999.999.999-99" />
```

### clearIfNotMatch prop

If clearIfNotMatch is true the input will be cleared if the value not match with the mask
```jsx
<InputMask mask="999.999.999-99" clearIfNotMatch />
```

### Using functions to format strings

#### example
```javascript
fitToMask('12332112312', '999.999.999-99') // returns '123.321.123-12'
```

#### example with add patterns
```html
<p>{{ 'asd-123' | simpleMask:'aaa-II':{'I': '[0-9]' } }}<p>
```
output:
```html
<p>123.321.123-12</p>
```

#### example with new patterns(ignoring old patterns)
```html
<p>{{ '123-bddd' | simpleMask:'III-aaa':{'I': '[0-9]' }:true }}<p>
```
output:
```html
<p>123-aaa</p>
```

## <a name="3"></a>Patterns
### Default patterns:

```typescript
patterns = {
    '9': new RegExp('[0-9]'),
    'a': new RegExp('[a-z]'),
    'A': new RegExp('[A-Z]'),
    'x': new RegExp('[a-zA-Z]'),
    '*': new RegExp('[a-zA-Z0-9]'),
    '~': new RegExp('[-\+]')
};
```

| pattern | meaning |
|------|---------|
| **9** | digits (0-9) |
| **a** | lowercase letters (a-z) |
| **A** | uppercase letters (A-Z) |
| **x** | letters uppercase or lowercase (a-z, A-Z) |
|  **~** | - or + |
| **\*** | letters or digits (a-z, A-Z, 0-9) |
|  **\\** | cancel next pattern effect |

#### Examples

| mask | example |
| ------- | ------- |
| 999.999.aaa | 113.123.asd |
| (AA) 999 | (AS) 123 |
| 999\\\~ | 999~ |

### Set new patterns

This add a new pattern, the patterns will not be overwritten
```jsx
<InputMask mask='999.999.999-aa' patterns={{ a: new RegExp('[0-9]') }} />
```
example of input: abc123

### Add patterns

The patterns will be overwritten
```jsx
<InputMask mask='aaa.aaa.aaa-aa99' addPatterns={{ a: new RegExp('[0-9]') }} />
```
example of input: +abc123


## License

MIT © [](https://github.com/)
