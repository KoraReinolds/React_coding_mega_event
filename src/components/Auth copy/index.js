import React from 'react'
import styles from './style.module.scss'
import Submit from '../Submit'
import FieldBlocks from '../FieldBlocks'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import {
  getAuthData,
} from '../../features/fieldsSlice'

const Auth = () => {

  const data = useSelector(getAuthData)
  const history = useHistory()

  return <form
    className={ styles.auth }
    onSubmit={ (e) => {
      history.push('/step2')
      e.preventDefault()
     } }
  >

    <div className={ styles.title }>
      Добро пожаловать
    </div>

    <FieldBlocks 
      data={ data }
    />

    <Submit
      value="Войти"
    />

  </form>
}

export default Auth
