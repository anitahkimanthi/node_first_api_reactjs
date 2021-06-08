import axios from 'axios'
import { useState } from 'react'
import './App.css'

function Signup () {
  const [state, setState] = useState({
    username: '',
    age: '',
    email: '',
    phone_number: '',
    password: '',
    gender: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
    console.log(value)
  }

  const handleGender = e => {
    const { value } = e.target
    setState({
      ...state,
      gender: value
    })

    console.log(value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const { username, email, phone_number, age, gender, pasword } = state
    // submit data to server
    const data = {
      username,
      email,
      phone_number,
      age,
      gender,
      pasword
    }

    const url = 'https://localhost/5454/users'
    const body = JSON.stringify({
      data
    })

    axios.post(url, {
      body: body,
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  const gender = ['male', 'female']

  return (
    <div className='app'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={state.username}
          placeholder='Enter username'
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          value={state.email}
          placeholder='Enter email'
          onChange={handleChange}
        />
        <input
          type='tel'
          name='phone_number'
          value={state.phone_number}
          placeholder='Enter phone number'
          onChange={handleChange}
        />
        <input
          type='number'
          name='age'
          value={state.age}
          placeholder='Enter age'
          onChange={handleChange}
        />
        <select>
          {gender.map((g, i) => (
            <option value={g} onClick={handleGender} key={i}>
              {g}
            </option>
          ))}
        </select>
        <input
          type='pasword'
          name='password'
          value={state.password}
          placeholder='Enter password'
          onChange={handleChange}
        />

        <button>Signup</button>
      </form>
    </div>
  )
}

export default Signup