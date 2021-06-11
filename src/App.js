import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css'
import Login from './login'
import Signup from './signup'
import Users from './users'
import EditUser from './edituser'
import Error from './error'

function App () {
  const history = createBrowserHistory()

  return (
    <div className='app row justify-content-center no-gutters'>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Signup} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/user/:id' component={EditUser} />
          <Route path='/users' component={Users} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
