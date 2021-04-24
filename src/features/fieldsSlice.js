import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const rules = {
  username: [
    (v) => v.length > 0 || 'Username is required',
  ],
  password: [
    (v) => v.length > 0 || 'Password is required',
  ],
  name: [
    (v) => v.length > 0 || 'ФИО is required',
    (v) => v.length >= 3 || 'Min 3 characters',
    (v) => v.length <= 10 || 'Max 10 characters',
  ],
  dob: [
    (v) => v.length > 0 || 'Day of Birthday is required',
  ],
  phone: [
    (v) => v.length > 0 || 'Phone is required',
    (v) => v.length == 18 || 'Must be properly formatted',
  ],
  eventId: [
    (v) => v.length > 0 || 'Event is required',
  ],
  cName: [
    (v) => v.length > 0 || 'Company name is required',
    (v) => v.length >= 3 || 'Min 3 characters',
    (v) => v.length <= 10 || 'Max 10 characters',
  ],
  pos: [
    (v) => v.length > 0 || 'Position is required',
    (v) => v.length >= 3 || 'Min 3 characters',
    (v) => v.length <= 10 || 'Max 10 characters',
  ],
}

const authList = ['username', 'password']
const form_1 = ['name', 'dob', 'phone']
const form_2 = ['cName', 'pos', 'phone']
const form_3 = ['eventId', 'opt1', 'opt2', 'opt3']

const initialState = {
  entity: {
    key: 'entity',
    value: 1,
    placeholder: 'Тип участника',
    options: [
      { title: 'Физ. лицо', id: 1 },
      { title: 'Юр. лицо', id: 2 },
    ],
    type: 'radio',
    errorMsg: '',
    error: !!(rules.entity && rules.entity.length),
  },
  cName: {
    key: 'cName',
    value: '',
    placeholder: 'Название компании',
    type: 'text',
    errorMsg: '',
    error: !!(rules.cName && rules.cName.length),
  },
  pos: {
    key: 'pos',
    value: '',
    placeholder: 'Ваша должность',
    type: 'text',
    errorMsg: '',
    error: !!(rules.pos && rules.pos.length),
  },
  name: {
    key: 'name',
    value: '',
    placeholder: 'ФИО',
    type: 'text',
    errorMsg: '',
    error: !!(rules.name && rules.name.length),
  },
  dob: {
    key: 'dob',
    value: '',
    placeholder: 'Дата рождения',
    type: 'date',
    errorMsg: '',
    error: !!(rules.dob && rules.dob.length),
  },
  phone: {
    key: 'phone',
    value: '',
    placeholder: 'Номер телефона',
    type: 'phone',
    errorMsg: '',
    error: !!(rules.phone && rules.phone.length),
  },
  username: {
    key: 'username',
    value: 'user@example.com',
    // value: '',
    placeholder: 'E-mail',
    type: 'text',
    errorMsg: '',
    error: false,
    // error: !!(rules.username && rules.username.length),
  },
  password: {
    key: 'password',
    value: 'user8952',
    // value: '',
    placeholder: 'Пароль',
    type: 'password',
    errorMsg: '',
    error: false,
    // error: !!(rules.password && rules.password.length),
    show_password: false,
  },
  opt1: {
    key: 'opt1',
    value: 0,
    options: [
      { title: 'Нужна проверка', id: 1 },
    ],
    type: 'checkbox',
    errorMsg: '',
    error: !!(rules.opt1 && rules.opt1.length),
  },
  opt2: {
    key: 'opt2',
    value: 0,
    options: [
      { title: 'Хочу получить раздаточный материал', id: 2 },
    ],
    type: 'checkbox',
    errorMsg: '',
    error: !!(rules.opt2 && rules.opt2.length),
  },
  opt3: {
    key: 'opt3',
    value: 0,
    options: [
      { title: 'Нужна помощь сопровождающего', id: 3 },
    ],
    type: 'checkbox',
    errorMsg: '',
    error: !!(rules.opt3 && rules.opt3.length),
  },
  eventId: {
    key: 'eventId',
    value: '',
    placeholder: 'День мероприятия',
    options: [
      // { id: 1, label: 'id: 1' },
      // { id: 2, label: 'id: 2' },
      // { id: 3, label: 'id: 3' },
      // { id: 4, label: 'id: 4' },
      // { id: 5, label: 'id: 5' },
      // { id: 6, label: 'id: 6' },
      // { id: 7, label: 'id: 7' },
    ],
    type: 'select',
    errorMsg: '',
    error: !!(rules.eventId && rules.eventId.length),
  },
}

export const makeRequest = createAsyncThunk(
  'fields/request',
  async (func) => {
    const { data } = await func()
    return data
  }
)

export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {

    changeField: (state, { payload: { key, value } }) => {

      const errors = rules[key] ?
        rules[key].map(f => f(value)).filter(v => v !== true) : []

      state[key].error = !!errors.length
      state[key].errorMsg = errors.length ? errors[errors.length - 1] : ''
      state[key].value = value

    },

    changePasswordVisibility: (state) => {
      state.password.show_password = !state.password.show_password
    },

    setEvents: (state, { payload }) => {
      state.eventId.options = payload
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(makeRequest.pending, (state) => {
        console.log('pending')
        state.status = 'pending'
      })
      .addCase(makeRequest.fulfilled, (state, data) => {
        console.log('fulfilled', data)
        state.status = 'fulfilled'
      })
      .addCase(makeRequest.rejected, (state, data) => {
        console.log('rejected', data)
        state.status = 'rejected'
      })
  },

})

export const { changeField, changePasswordVisibility, setEvents } = fieldSlice.actions

export const getAuthValues = ({ fields }) => authList.reduce(
  (sum, cur) => ({ ...sum, [cur]: fields[cur].value }), {}
)

export const getAuthValid = ({ fields }) => authList
  .map(fieldName => fields[fieldName].error)
  .every(v => v === false)

export const getAuthData = ({ fields }) => [{
  fields: authList.map(fieldName => fields[fieldName])
}]

export const getFormValues = ({ fields }) => ({
  ...[
    ...(fields.entity.value === 1 ? form_1 : form_2),
    ...form_3
  ].reduce(
    (sum, cur) => ({ ...sum, [cur]: fields[cur].value }), {}
  ),
  eventId: fields.eventId.options.find(
    ({ label }) => label === fields.eventId.value
  )?.id
})

export const getFormValid = ({ fields }) => [
  ...(fields.entity.value === 1 ? form_1 : form_2),
  ...form_3
]
  .map(fieldName => fields[fieldName].error)
  .every(v => v === false)

export const getFormData = ({ fields }) => [
  {
    title: "Личные данные",
    fields: [
      ...(fields.entity.value === 1 ? form_1 : form_2).map(fieldName => fields[fieldName])
    ],
  },
  {
    title: "Выберите дату мероприятия",
    fields: form_3.map(fieldName => fields[fieldName])
  }
]

export const getResultData = ({ fields }) => {

  const result_template_1 = ['name', 'entity', 'phone', 'dob']
  const result_template_2 = ['cName', 'entity', 'phone', 'pos']
  const result_template_3 = ['opt1', 'opt2', 'opt3'].filter((v) => !!(fields[v].value))
  const template = (fields.entity.value === 1 ? result_template_1 : result_template_2)
    .reduce(
      (sum, cur) => ({
        ...sum,
        [fields[cur].placeholder]: [cur === 'entity' ? 
          fields[cur].options.find(({ id }) => id === fields[cur].value)?.title :
          fields[cur].value]
      }), {}
    )
  
  if (result_template_3.length) {
    template.Опции = result_template_3.map((v) => fields[v].options[0].title)
  }

  return template

}

export const getEntity = ({ fields }) => fields.entity

export const getStatus = ({ fields }) => fields.status

export default fieldSlice.reducer
