import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Container} from 'reactstrap'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'

import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/AuthActions'
 class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
      <div className="">
        <AppNavbar/>
        <Container>


        <ItemModal/>
        <ShoppingList/>

        </Container>
      </div>
      </Provider>
      
    )
  }
}
export default App;
