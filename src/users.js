import React, { useState, useEffect } from 'react'
import url from './base'
import axios from 'axios'

export default function Users () {
  const [users, setUsers] = useState([])

  const getUsers = () =>{
    axios
      .get(`${url}/users`)
      .then(res => {
        console.log(res.data)
        setUsers(res.data)
      })
      .catch(error => {console.log(error)})
  }
  useEffect(() => {
    getUsers();
  }, [])

  const deleteUser = (id) =>{
    console.log(id)
    
    axios.delete(`${url}/users/${id}`)
    .then(res => {
      getUsers();
    }).catch(error => {})
  }
  return (
    <div className="users">
      {users.map((user, i) => (
        <ul>
          <li><b>NAME : </b><span>{user.username}</span></li>
          <li><b>EMAIL :</b> <span>{user.email}</span></li>
          <li><b>TEL : </b><span>{user.phone_number}</span></li>
          <li><b>AGE :</b> <span>{user.age}</span></li>
          <li><b>GENDER : </b><span>{user.gender}</span></li>
          <button onClick={(e) => deleteUser(user.id)}>DELETE USER</button>
        </ul>
      ))}
    </div>
  )
}
