import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Input from '../Input'
import ArrowIconDown from '../../assets/icons/arrowDown'
import ArrowIconUp from '../../assets/icons/arrowUp'

const InputSelect = ({ onChange, ...props }) => {

  const[isOpen, setVisibility] = useState(false)

  const toggleVisibility = function() {
    setVisibility(false)
  }

  // const value = 

  useEffect(() => {
    window.addEventListener('click', toggleVisibility)
    return () => window.removeEventListener('click', toggleVisibility)
  }, [])

  return <div
    className={ styles.select }
  >
    <Input 
      { ...props }
      onClick={(e) => {
        setVisibility(!isOpen)
        e.stopPropagation()
      }}
      readOnly
      end_icon={
        isOpen ? <ArrowIconUp /> : <ArrowIconDown />
      }
    />
    {
      isOpen && <div
        className={ styles.list }
      >
        {
          props.options.map(({ id, label }) => <div
            className={ styles.text }
            key={ 'select' + id }
            onClick={() => {
              onChange(label)
            }}
          >
            { label }
          </div>)
        }
      </div>
    }
  </div>
  
}

export default InputSelect