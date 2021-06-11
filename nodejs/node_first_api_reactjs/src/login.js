import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className='auth col-12 col-sm-11 col-md-10 col-lg-6 col-xl-4'>
      <form onSubmit={handleSubmit} className="row">
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
        <small className="col-12 col-sm-5"><Link to="/forgot-pasword" className="forgot-password">Forgot password?</Link></small>
        <small className="col-12 col-sm-7 create-account">Don't have an account? <Link to="/signup" >Register</Link></small>
        <button>Login</button>

      </form>
    </div>
  )
}

export default Login