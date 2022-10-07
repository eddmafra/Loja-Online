import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

class Home extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/cart" data-testid="shopping-cart-button" />
        <button type="button">
          Carrinho de Compras
        </button>
        <Search />
      </div>
    );
  }
}
export default Home;
