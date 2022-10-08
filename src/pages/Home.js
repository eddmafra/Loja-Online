import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import Categorias from '../components/Categorias';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { listCategories: [] };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categorias = await api.getCategories();
    this.setState({
      listCategories: categorias,
    });
  };

  render() {
    const { listCategories } = this.state;
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
        <h3>Categorias</h3>
        {listCategories.map((categoria) => (<Categorias
          categoryID={ categoria.id }
          name={ categoria.name }
          key={ categoria.id }
        />))}
      </div>
    );
  }
}
export default Home;
