import React, { useState, useEffect } from 'react'
import url from './base'
import axios from 'axios'

export default function Users () {
  const [state, setState] = useState({
    users: ''
  })

  useEffect(() => {
       axios.get(url)
       .then(response =>{
           response.json()
           console.log(response.json())
       })
       .then(results => {
           console.group(results)
           setState({
               ...state,
               users: results
           })
       })
       .catch(error => {console.log(error)})
  }, [])

  return <div>{state.users}</div>
}
