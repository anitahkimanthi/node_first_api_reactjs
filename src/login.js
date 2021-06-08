import axios from 'axios'
import { useState } from 'react'
import url from "./base"

function Login () {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
    
  }

  const handleSubmit = e => {
    e.preventDefault()

    const { email, password } = state
    // submit data to server
    const data = {
      email : email,
      password : password
    }

    console.log(data)

    axios.post(`${url}/users/`, {
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log(response.status)
    })
    .catch(error => {})
  }

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
          <h2><b>LOGIN</b></h2>
        <input
          type='email'
          name='email'
          value={state.email}
          placeholder='Enter email'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          value={state.password}
          placeholder='Enter password'
          onChange={handleChange}
        />

        <button>Login</button>
      </form>
    </div>
  )
}

export default Login