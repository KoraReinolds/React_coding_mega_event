import React, { useState } from 'react'
import Form from '../Form'
import FieldBlocks from '../FieldBlocks'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAuthData,
  makeRequest,
  getAuthValues,
  getAuthValid,
} from '../../features/fieldsSlice'
import { useHistory } from "react-router-dom"
import axios from '../../api'

const Auth = () => {

  const dispatch = useDispatch()
  const [submitValue, setSubmitValue] = useState('Войти')
  const history = useHistory()
  const data = useSelector(getAuthData)
  const dataValues = useSelector(getAuthValues)
  const dataValid = useSelector(getAuthValid)

  console.log('dataValid', dataValid)

  return <Form
    title="Добро пожаловать"
    submitValue={ submitValue }
    disabled={ !dataValid }
    onSubmit={ async () => {

      const { type, payload, error } = await dispatch(makeRequest(
        () => axios.post('/auth', dataValues)
      ))

      const status = type.split('/')[2]
      
      if (status === 'fulfilled') {
        localStorage.setItem('token', payload.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
        history.push( '/step2' )
      } else if (status === 'rejected') {

        const status = error.message.split(' ').reverse()[0]

        if (status === '400') {
          setSubmitValue('Invalid email or password. Try again')
        } else if (status === '500') {
          setSubmitValue('Server error. Try again')
        }

      }

    } }
  >

    <FieldBlocks 
      data={ data }
    />

  </Form>
}

export default Auth
