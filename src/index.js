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

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Home} />
    {/* <Route path="/some/otherpage" component={SomeOtherPage} /> */}
  </BrowserRouter>,
  document.getElementById('app')
)
