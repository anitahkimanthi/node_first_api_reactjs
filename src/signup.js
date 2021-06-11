import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import url from './base'

function Signup () {
  const [state, setState] = useState({
    username: '',
    age: '',
    email: '',
    phone_number: '',
    password: '',
    gender: '',
    successMsg: 'male'
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
    const data = {
      username: username,
      email: email,
      phone_number: phone_number,
      age: age,
      gender: gender,
      password: password
    }

    axios
      .post(`${url}/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
        body : data
      })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setState({
            successMsg: 'User created successifully'
          })
        } else {
          console.log(response.status)
        }
      })
      .catch(error => {})

    // setState({
    //   username: '',
    //   age: '',
    //   email: '',
    //   phone_number: '',
    //   password: '',
    //   gender: ''
    // })
  }

  const gender = ['male', 'female']

  return (
    <div className='auth col-12 col-sm-11 col-md-10 col-lg-6 col-xl-4'>
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
        <select onClick={handleGender}>
          {gender.map((g, i) => (
            <option value={g} key={i}>
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
        <div className='footer'>
          <small>
            By clicking register you are agreeing to our{' '}
            <Link href='/signup' className='terms'>
              terms and conditions
            </Link>
            .
          </small>
          <br />
          <br />
          {state.username === '' ||
          state.email === '' ||
          state.phone_number === '' ||
          state.age === '' ||
          gender === '' ||
          state.password === '' ? (
            <button disabled>REGISTER</button>
          ) : (
            <button>REGISTER</button>
          )}
          <br />
          <div className='col-12 text-center'>
            <small>
              Have an account? <Link to='/login'>Login</Link>.
            </small>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
