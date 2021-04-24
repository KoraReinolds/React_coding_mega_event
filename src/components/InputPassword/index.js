import React from 'react'
import Input from '../Input'
import EyeIcon from '../../assets/icons/eye'
import EyeClosedIcon from '../../assets/icons/eyeClosed'
import { useDispatch } from 'react-redux'
import {
  changePasswordVisibility,
} from '../../features/fieldsSlice'


const InputPassword = ({ end_icon, show_password, ...props }) => {

  const dispatch = useDispatch()

  return <Input
    { ...props }
    type={ show_password ? 'text' : 'password' }
    end_icon={
      show_password ?
        <EyeClosedIcon
          onClick={ () => dispatch(changePasswordVisibility()) }
        /> :
        <EyeIcon
          onClick={ () => dispatch(changePasswordVisibility()) }
        />
    }
  >
  </Input>
}

export default InputPassword