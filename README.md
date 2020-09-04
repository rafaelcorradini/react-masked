# react-masked

> Input and text mask for React

[![NPM](https://img.shields.io/npm/v/react-masked.svg)](https://www.npmjs.com/package/react-masked)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rafaelcorradini/react-masked/master/LICENSE)
[![Build Status](https://travis-ci.com/rafaelcorradini/react-masked.svg?branch=master)](https://travis-ci.com/rafaelcorradini/react-masked)
[![Coverage Status](https://coveralls.io/repos/github/rafaelcorradini/react-masked/badge.svg?branch=master)](https://coveralls.io/github/rafaelcorradini/react-masked?branch=master)

## Install

```bash
npm install --save react-masked
```

## Usage


### mask prop
```jsx
import { InputMask } from 'react-masked'

<InputMask mask="999.999.999-99" />
```

### clearIfNotMatch prop

If clearIfNotMatch is true the input will be cleared if the value not match with the mask

```jsx
import { InputMask } from 'react-masked'

<InputMask mask="999.999.999-99" clearIfNotMatch />
```

### Using functions to format strings

#### example
```javascript
import { fitToMask } from 'react-masked'

fitToMask('12332112312', '999.999.999-99') // returns '123.321.123-12'
```

#### example with custom patterns
```javascript
import { fitToMask } from 'react-masked'

fitToMask('12332112312', 'aaa.aaa.aaa-aa', { a: new RegExp('[0-9]') }) // returns '123.321.123-12'
```

## Patterns
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

This add a new pattern, the patterns wont be overwritten
```jsx
<InputMask mask='999.999.999-aa' patterns={{ a: new RegExp('[0-9]') }} />
```
example of input: 123.123.123-1122

### Add patterns

The patterns will be overwritten
```jsx
<InputMask mask='aaa.aaa.aaa-aa99' addPatterns={{ a: new RegExp('[0-9]') }} />
```
example of input: 123.123.123-1199


## License

MIT © [](https://github.com/)
