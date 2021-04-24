import React from 'react'
import styles from './App.module.scss'
import Auth from './components/Auth'
import FillInfo from './components/FillInfo'
import ShowInfo from './components/ShowInfo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

console.log(styles)

const App = () => <div className={ styles.app }>
  <header className={ styles.header }>
    Coding Mega Event
  </header>
  <Router>
      <Switch>
        <Route path="/step2">
          <FillInfo />
        </Route>
        <Route path="/step3">
          <ShowInfo />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
  </Router>

</div>

export default App