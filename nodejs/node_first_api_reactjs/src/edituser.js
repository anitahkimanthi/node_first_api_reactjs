import React, { useState, useEffect } from 'react'
import url from './base'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { withRouter } from 'react-router'

function EditUser (props) {
  const [state, setState] = useState({
    username: '',
    email: '',
    phone_number: '',
    age: '',
    successMsg: ''
  })
  const location = useLocation()

  useEffect(() => {
    console.log(props.history)
    getUserById()
  }, [])

  // get user by id function
  const getUserById = () => {
    const id = location.state.id
    console.log(id)

    axios.get(`${url}/users/${id}`).then(response => {
      const data = response.data
      setState({
        username: data.username,
        email: data.email,
        phone_number: data.phone_number,
        age: data.age
      })
    })
  }
  // edit user data function
  const handleChange = e => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const editUser = e => {
    e.preventDefault()
    const id = props.location.state.id

    const { username, email, phone_number, age } = state
    // submit data to server
    const data = {
      username: username,
      email: email,
      phone_number: phone_number,
      age: age
    }

    axios
      .update(`${url}/users/${id}`, data)
      .then(response => {
        if (response.status === 200) {
          setState({
            successMsg: 'User updated successifully'
          })
          getUserById()
        } else {
          console.log(response.status)
        }
      })
      .catch(error => {})
  }

  return (
    <div className='auth col-12 col-sm-11 col-md-10 col-lg-6 col-xl-4'>
      <form onSubmit={editUser}>
        <h2>
          <b>USER INFORMATION</b>
        </h2>
        <label>Username : </label>
        <input
          type='text'
          name='username'
          value={state.username}
          placeholder='Enter username'
          onChange={handleChange}
        />
        <label>Email : </label>
        <input
          type='email'
          name='email'
          value={state.email}
          placeholder='Enter email'
          onChange={handleChange}
        />
        <label>Phone number</label>
        <input
          type='tel'
          name='phone_number'
          value={state.phone_number}
          placeholder='Enter phone number'
          onChange={handleChange}
        />
        <label>Age</label>
        <input
          type='number'
          name='age'
          value={state.age}
          placeholder='Enter age'
          onChange={handleChange}
        />
        <div className='footer'>
          {state.username === '' ||
          state.email === '' ||
          state.phone_number === '' ||
          state.age === '' ? (
            <button disabled>SAVE</button>
          ) : (
            <button>SAVE</button>
          )}
        </div>
      </form>
    </div>
  )
}

export default EditUser
