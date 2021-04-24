import React from 'react'
import styles from './style.module.scss'
import cn from 'classnames'
import stylesBtn from '../../assets/button.module.scss'

const InputChecbox = ({ toggler, onChange, value, options, type, disabled }) => {

  return <div
    className={ cn([styles[toggler ? 'toggler' : 'normal'], styles.options]) }
  >
    {
      options.map(
        ({ title, id }) => <div
          className={ cn([
            styles.option_box,
            type === 'radio' && stylesBtn.button,
            type === 'radio' && value !== id && stylesBtn.disabled,
          ]) }
          key={ title + id }
        >
          <input
            className={ styles.option_input }
            disabled={ disabled }
            type={ type }
            id={ title + id }
            value={ id }
            checked={ type === 'radio' ? value === id : value }
            onChange={ () => onChange(
              type === 'radio' ?
                id :
                value ? 0 : 1
              )}
          />
          <label
            className={ styles.option_label }
            htmlFor={ title + id }
          >
            { title }
          </label>
        </div>
      )
    }
  </div>

}

export default InputChecbox
