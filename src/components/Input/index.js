import React from 'react'
import styles from './style.module.scss'
import cn from 'classnames'

const Input = ({ onChange, error, errorMsg, className, placeholder, ...props }) => {

  const id = Math.random()

  return <div
    className={ cn([className, styles.input_box]) }
  >

    <input
      type="text"
      { ...props }
      className={ styles.input }
      onChange={ e => onChange(e.target.value) }
      id={ id }
      required
    />

    <label
      className={ styles.placeholder }
      htmlFor={ id }
    >
      { placeholder }
    </label>

    {
      errorMsg && <div
        className={ styles.error }
      >
        { errorMsg }
      </div>
    }

    {
      props.end_icon && <div
        className={ styles.end_icon }
      >
        { props.end_icon }
      </div>
    }

  </div>
}

export default Input