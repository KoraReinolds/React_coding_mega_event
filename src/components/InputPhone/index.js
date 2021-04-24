import React from 'react'
import Input from '../Input'

const InputPhone = (props) => {

  return <Input
    { ...props }
    type='text'
    onChange={ (val) => {
      
      val = val
        .replace(/\+7/, '')
        .replace(/\+ /, '')
        .replace(/7 /, '')
        .split('').filter(l => !isNaN(l) && l !== ' ').join('')

      if (val === '') props.onChange('')

      const lastLetter = val[val.length - 1]

      if (!isNaN(lastLetter)) {
        const part_1 = val.slice(0, 3)
        const part_2 = val.slice(3, 6)
        const part_3 = val.slice(6, 8)
        const part_4 = val.slice(8, 10)
        let s = ''
        if (part_1) s +=  `+7 (${ part_1 }`
        if (part_2) s +=  `) ${ part_2 }`
        if (part_3) s +=  `-${ part_3 }`
        if (part_4) s +=  `-${ part_4 }`
        props.onChange(s)
      }

    } }
  >
  </Input>
}

export default InputPhone