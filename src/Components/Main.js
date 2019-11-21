import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Provider } from 'react-redux'
import Home from './Home'
import PriceConfigEdit from './PriceConfigEdit'
import SidebarLayout from './SidebarLayout'
import {ListedCategories} from '../Helpers/helper'
import {setTrans} from '../actions/actions'
import { connect } from 'react-redux';
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
    this.state = {
        priceConfig: this.prettyJson(ListedCategories),
        isOpen: false,
        trans: []
    }

    this.updatePriceConfig = this.updatePriceConfig.bind(this)
    this.getPriceConfig = this.getPriceConfig.bind(this)
    this.prettyJson = this.prettyJson.bind(this)
    this.onDataCompleted = this.onDataCompleted.bind(this);
  }

  prettyJson(text){
    if(typeof text === 'string'){
        text = JSON.parse(text)
    }
    return JSON.stringify(text,function(k,v){
        if(v instanceof Array)
           return v;
        return v;
     },2)
}

  updatePriceConfig(priceConfig){
    console.log(123);
    this.setState({priceConfig:priceConfig})
  }

  getPriceConfig(){
      return this.state.priceConfig;
  }

  onDataCompleted(transactions){
    store.dispatch(setTrans(transactions));
    this.setState({trans:transactions})
}

  render(){
    return (
      <Provider store={store}>
        <SidebarLayout onDataCompleted={this.onDataCompleted}>
          <BrowserRouter>
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} trans={this.state.trans} priceConfig={JSON.parse(this.state.priceConfig)} updatePriceConfig={this.updatePriceConfig} />} />
                <Route exact path="/edit" render={(props) => <PriceConfigEdit {...props} on={true} priceConfig={this.state.priceConfig} updatePriceConfig={this.updatePriceConfig}/> }/>
              </Switch>
          </BrowserRouter>
        </SidebarLayout>
      </Provider>
    )
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(Main)