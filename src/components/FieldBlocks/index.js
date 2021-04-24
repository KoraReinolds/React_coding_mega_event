import React from 'react'
import styles from './style.module.scss'
import Input from '../Input'
import InputCheckbox from '../InputCheckbox'
import InputPassword from '../InputPassword'
import InputSelect from '../InputSelect'
import InputPhone from '../InputPhone'
import { useSelector, useDispatch } from 'react-redux'
import {
  changeField,
  getStatus,
} from '../../features/fieldsSlice'

const FieldBlocks = ({ data }) => {

  const dispatch = useDispatch()

  const status = useSelector(getStatus)

  return <div className={ styles.blocks }>
    {
      data.map(({ title, fields }, index) => {
        return <div
          key={ `block_${index}` }
          className={ styles.block }
        >
          {
            title && <div className={ styles.block_title } >{ title }</div>
          }
          {
            fields.map(({ key, ...fieldData }) => {
              let RenderComponent
              switch(fieldData.type) {
                case 'password':
                  RenderComponent = InputPassword
                  break
                case 'checkbox':
                  RenderComponent = InputCheckbox
                  break
                case 'select':
                  RenderComponent = InputSelect
                  break
                case 'phone':
                  RenderComponent = InputPhone
                  break
                default:
                  RenderComponent = Input
                  break
              }
              if (status === 'pending') {
                fieldData.value = ''
              }
              return <RenderComponent
                key={ key }
                { ...fieldData }
                onChange={ value => dispatch(changeField({ key, value })) }
                disabled={ status === 'pending' }
              />
            })
          }
        </div>
      })
    }
  </div>
}

export default FieldBlocks
