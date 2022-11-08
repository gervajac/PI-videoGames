import React from "react";
import { Route, Switch, BrowserRouter} from 'react-router-dom';
// components
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
import CreateVideogame from './components/CreateGame'


export default function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" exact component={Home}/>
        <Route exact path="/addvideogame" component={CreateVideogame}/>
        <Route exact path="/videogame/:idVideogame" component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
