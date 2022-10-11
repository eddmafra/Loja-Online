import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import Categorias from '../components/Categorias';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      listCategories: [],
      result: [],
      resultado: false,
      listCart: [],
    };
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

  addCart = (item) => {
    this.setState((prevState) => (
      { listCart: [...prevState.listCart, item] }), () => {
      const { listCart } = this.state;
      localStorage.setItem('listCart', JSON.stringify(listCart));
    });
  };

  handleChecked = async ({ target }) => {
    const list = await api.getProductByCategoryId(target.id);
    // console.log(list.results);
    const { results } = list;
    this.setState({
      result: results,
      resultado: true,
    });
  };

  handleSearch = async () => {
    const { searchValue } = this.state;
    const result = await api.getProductByQuery(searchValue);
    // console.log(result.results);
    const { results } = result;
    if (results.filter((el) => el.title.includes(searchValue))) {
      this.setState({
        result: results,
        resultado: true,
      });
    } else {
      this.setState({
        resultado: false,
      });
    }
  };

  render() {
    const { listCategories, result, resultado } = this.state;
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/cart" data-testid="shopping-cart-button">
          <button
            type="button"
          >
            Carrinho de Compras
          </button>
        </Link>
        <Search
          handleSearch={ this.handleSearch }
        />
        <h3>Categorias</h3>
        {listCategories.map((categoria) => (<Categorias
          categoryID={ categoria.id }
          name={ categoria.name }
          key={ categoria.id }
          handleChecked={ this.handleChecked }
        />))}
        {!resultado ? 'Nenhum produto foi encontrado' : (
          result.map((item) => (
            <div
              key={ item.id }
              data-testid="product"
            >
              <p>{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>
                {`R$: ${item.price}`}
              </p>
              <button type="button">
                <Link
                  data-testid="product-detail-link"
                  to={ `/Details/${item.id}` }
                >
                  Mais detalhes
                </Link>
              </button>

              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => this.addCart(item) }
              >
                Carrinho de Compras
              </button>
            </div>))
        )}
      </div>
    );
  }
}
export default Home;
