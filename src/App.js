import React, {Fragment} from 'react';
import './App.css';
import CardForm from './Components/CardForm';
import Success from './Components/Success';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Fragment className="App">
      <Router>
      <Switch>

<Route exact path='/' component={CardForm} />
<Route exact path='/success' component={Success} />
</Switch>
      </Router>
     

    </Fragment>
  );
}

export default App;
