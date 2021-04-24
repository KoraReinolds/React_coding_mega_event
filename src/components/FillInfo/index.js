import React, { useEffect } from 'react'
import FieldBlocks from '../FieldBlocks'
import Form from '../Form'
import InputCheckbox from '../InputCheckbox'
import { useSelector } from 'react-redux'
import {
  getFormData,
  getFormValid,
  getFormValues,
  getEntity,
  changeField,
  makeRequest,
  setEvents,
  getResultData,
} from '../../features/fieldsSlice'
import { useDispatch } from 'react-redux'
import axios from '../../api'
import { useHistory } from "react-router-dom"

const FillInfo = () => {

  const { key, ...entityData } = useSelector(getEntity)
  const history = useHistory()
  const dispatch = useDispatch()
  const data = useSelector(getFormData)
  const dataValues = useSelector(getFormValues)
  const dataValid = useSelector(getFormValid)

  useEffect(() => {

    const f = async () => {

      const { type, payload, error } = await dispatch(makeRequest(
        () => axios.get('/list')
      ))
      
      const status = type.split('/')[2]

      if (status === 'fulfilled') {
        dispatch(setEvents(payload.eventsDate))
      } else if (status === 'rejected') {

        const code = error.message.split(' ').reverse()[0]

        if (code === '403' || code === '401') {
          history.push( '/' )
        } else if (code === '500') {
          f()
        }
      }

    }

    f()

  }, [])

  return <Form
    title="Заполните анкету участника"
    submitValue="Отправить заявку"
    disabled={ !dataValid }
    onSubmit={ async () => {

      const { type, payload } = await dispatch(makeRequest(
        () => axios.post('/request', dataValues)
      ))

      const status = type.split('/')[2]

      if (status === 'fulfilled') {
        history.push( '/step3' )
      }

    } }
  >

    <InputCheckbox 
      toggler={ true }
      onChange={ value => dispatch(changeField({ key, value })) }
      { ...entityData }
    />

    <FieldBlocks 
      data={ data }
    />

  </Form>

}

export default FillInfo
