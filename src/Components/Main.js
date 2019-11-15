import React from "react";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {setTransactions} from '../reducers/test_reducer'

import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

const store = createStore(setTransactions)

import Home from './Home'
import {ListedCategories} from '../Helpers/helper'

export default class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        priceConfig: this.prettyJson(ListedCategories)
    }

    this.updatePriceConfig = this.updatePriceConfig.bind(this)
    this.getPriceConfig = this.getPriceConfig.bind(this)
    this.prettyJson = this.prettyJson.bind(this)
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
    this.setState({priceConfig:priceConfig})
  }

  getPriceConfig(){
      return this.state.priceConfig;
  }

  render(){
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} priceConfig={JSON.parse(this.state.priceConfig)} updatePriceConfig={this.updatePriceConfig} />} />
              {/* <Route exact path="/edit" render={(props) => <PriceConfigEdit {...props} priceConfig={this.state.priceConfig} updatePriceConfig={this.updatePriceConfig}/> }/> */}
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
      </Provider>

    )
  }
}


//Layout
const Layout = ({children}) => (
  <div>
    <header>
      <h1>Header</h1>
    </header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/edit">Edit</Link>
    </nav>
    <section>
      {children}
    </section>
    <footer>
      <p>Footer</p>
    </footer>
  </div>
)
