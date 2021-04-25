import React from 'react'
import styles from '../../assets/button.module.scss'
import { useSelector } from 'react-redux'
import {
  getStatus,
} from '../../redux/fieldsSlice'

const Submit = (props) => {

  const status = useSelector(getStatus)

  return <div className={ styles.btn_box }>

    <input
      className={ styles.button }
      type="submit"
      { ...props }
      // если идет запрос к серверу убираем текст
      // и делаем невозможной отпраку формы
      value={ status === 'pending' ? '' : props.value }
      disabled={ props.disabled || status === 'pending' }
    />

    {
      // запускаем прелоадер если идет запрос к серверу
      (status === 'pending') && <svg className={ styles.preloader } height="20" width="20">
        <circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="2" fill="none" strokeWidth="1" />
        
      </svg>
    }
    
  </div>

}
export default Submit