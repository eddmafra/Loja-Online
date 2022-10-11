import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import './App.css';
import Form from './components/Form';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
<<<<<<< HEAD
          <Route path="/details/:id" component={ ProductDetails } />
=======
          <Route path="/star" component={ Form } />
>>>>>>> ad45412 (inicio requisito 11)
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
