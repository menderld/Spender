import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Home from '../src/Components/Home'
import HierarchyEdit from '../src/Components/HierarchyEdit'

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/edit" component={HierarchyEdit}/>
    {/* <Route path="/some/otherpage" component={SomeOtherPage} /> */}
  </BrowserRouter>,
  document.getElementById('app')
)
