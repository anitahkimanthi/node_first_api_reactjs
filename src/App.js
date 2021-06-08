
import { Route, Router, Switch } from 'react-router'
import {createBrowserHistory} from 'history'
import './App.css'
import Login from './login'
import Signup from './signup'
import Users from './users'
import Error from './error'

function App () {
  const history = createBrowserHistory()
  return (
    <div className='app'>
      <Router history={history}>
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/users' component={Users} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
