import axios from 'axios'
import { useState } from 'react'
import url from './base'

function Signup () {
  const [state, setState] = useState({
    username: '',
    age: '',
    email: '',
    phone_number: '',
    password: '',
    gender: 'male'
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleGender = e => {
    const { value } = e.target
    setState({
      ...state,
      gender: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const { username, email, phone_number, age, gender, password } = state
    // submit data to server
    const data = JSON.stringify({
      username: username,
      email: email,
      phone_number: phone_number,
      age: age,
      gender: gender,
      password: password
    })

    console.log(data)

    axios
      .post(`${url}/register`, data)
      .then(response => {
        console.log(response.status)
      })
      .catch(error => {})
  }

  const gender = ['male', 'female']

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <h2>
          <b>REGISTER</b>
        </h2>
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
            <option value={g} onClick={handleGender} id={g} key={i}>
              {g}
            </option>
          ))}
        </select>
        <input
          type='password'
          name='password'
          value={state.password}
          placeholder='Enter password'
          onChange={handleChange}
        />
        {state.username === '' ||
        state.email === '' ||
        state.phone_number === '' ||
        state.age === '' ||
        gender === '' ||
        state.password === '' ? (
          <button disabled>Signup</button>
        ) : (
          <button>Signup</button>
        )}
      </form>
    </div>
  )
}

export default Signup
