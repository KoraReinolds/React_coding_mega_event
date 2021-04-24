import React, { Fragment } from 'react'
import Form from '../Form'
import { useSelector } from 'react-redux'
import styles from './style.module.scss'
import {
  getResultData,
} from '../../features/fieldsSlice'
import { useHistory } from "react-router-dom"

const ShowInfo = () => {

  const history = useHistory()

  const data = useSelector(getResultData)

  return <Form
    title="Спасибо за заявку!"
    submitValue="Вернуться на главную"
    onSubmit={ () => history.push( '/' ) }
  >
    <div
      className={ styles.results }
    >
      {
        Object.entries(data).map(([key, value]) => <Fragment key={ key }>
          <div className={ styles.title }>{ key }</div>
          {
            value.map((v, index) => <div key={ index+v } className={ styles.text }>{ v }</div>)
          }
        </Fragment>)
      }
    </div>

  </Form>

}

export default ShowInfo
