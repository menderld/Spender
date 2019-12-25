import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Provider } from 'react-redux'
import Home from './Home'
import PriceConfigEdit from './PriceConfigEdit'
import SidebarLayout from './SidebarLayout'
import {getDefaultCategories, getMappingFactoryFromLocalStorage} from '../Helpers/helper'
import CatMapping from '../Models/CatMapping'
import {setTrans, addConfig, createMappingConfig, cleanStore} from '../actions/actions'
import {store} from '../config'

import {
  BrowserRouter,
  Route,
} from "react-router-dom";

export default class Main extends React.Component{
  constructor(props){
    super(props)

    this.onDataCompleted = this.onDataCompleted.bind(this);

    var config = getMappingFactoryFromLocalStorage();
    config = config == undefined ? {"root": getDefaultCategories().getMapping()} : config
    console.log(config)
    store.dispatch(createMappingConfig(config));
  }

  onDataCompleted(transactions){
    //store.dispatch(cleanStore())
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