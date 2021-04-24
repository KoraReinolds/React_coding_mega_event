import React from 'react'
import styles from './style.module.scss'
import Submit from '../Submit'
import { useSelector } from 'react-redux'
import {
  getStatus,
} from '../../features/fieldsSlice'

const Form = ({ disabled, onSubmit, children, title, submitValue }) => {

  const status = useSelector(getStatus)

  return <form
    className={ styles.auth }
    onSubmit={ async (e) => {
      e.preventDefault()
      await onSubmit()
     } }
  >

    <div className={ styles.title }>
      { title }
    </div>

    { children }

    <Submit
      value={ submitValue }
      disabled={ disabled }
    />

  </form>
}

export default Form
