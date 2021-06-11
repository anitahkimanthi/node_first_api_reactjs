import React, { useState, useEffect } from 'react'
import url from './base'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'

function Users (props) {
  const [users, setUsers] = useState([])
  const history = useHistory();

  const getUsers = () => {
    axios
      .get(`${url}/users`)
      .then(res => {
        setUsers(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    console.log(props.history)
    getUsers()
  }, [])

  // delete user function
  const deleteUser = id => {
    axios
      .delete(`${url}/users/${id}`)
      .then(res => {
        getUsers()
      })
      .catch(error => {})
  }

  // redirect user to edit page on click edit user button
  const redirect = id => {
    history.push({
      pathname: `/user/${id}`,
      state: { id: id }
    })
  }

  return (
    <div className='users col-12 col-sm-11 col-md-10 col-lg-8'>
      <div className='row no-gutters'>
        {users.map((user, i) => (
          <ul className='col-12 col-sm-6 col-md-4 ' key={i}>
            <div className='usercont'>
              <li>
                <b>NAME : </b>
                <span>{user.username}</span>
              </li>
              <li>
                <b>EMAIL :</b> <span>{user.email}</span>
              </li>
              <li>
                <b>TEL : </b>
                <span>{user.phone_number}</span>
              </li>
              <li>
                <b>AGE :</b> <span>{user.age} years old</span>
              </li>
              <li>
                <b>GENDER : </b>
                <span>{user.gender}</span>
              </li>
              <div className='footer'>
                <div className='col-12 col-md-6'>
                  <button onClick={e => deleteUser(user.id)}>
                    DELETE USER
                  </button>
                </div>
                <div className='col-12 col-md-6'>
                  <button onClick={e => redirect(user.id)}>EDIT USER</button>
                </div>
              </div>
            </div>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Users;
