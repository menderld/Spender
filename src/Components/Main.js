import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Provider } from 'react-redux'
import Home from './Home'
import PriceConfigEdit from './PriceConfigEdit'
import SidebarLayout from './SidebarLayout'
import {ListedCategories, getConfigFromLocalStorage} from '../Helpers/helper'
import {setTrans, setConfig} from '../actions/actions'
import {store} from '../config'

import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";


// const mapStateToProps = function(state){
//   return {
//      trans: state.trans,
//   }
// }

// const mapDispatchToProps = dispatch => ({
// ...setTrans,
// dispatch                // ← Add this
// })


export default class Main extends React.Component{
  constructor(props){
    super(props)

    this.onDataCompleted = this.onDataCompleted.bind(this);

    var config = getConfigFromLocalStorage();
    store.dispatch(setConfig((config && config != 'undefined') ? JSON.parse(config) : ListedCategories));
    store.dispatch(setTrans())
  }

  onDataCompleted(transactions){
    store.dispatch(setTrans(transactions));
}

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
           <SidebarLayout onDataCompleted={this.onDataCompleted}>
                <Route exact path="/" render={(props) => <Home {...props} />} />
                <Route exact path="/edit" render={(props) => <PriceConfigEdit {...props} on={true}/> } />
           </SidebarLayout>
        </BrowserRouter>
      </Provider>
    )
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(Main)