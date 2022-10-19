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
      cartSize: 0,
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.updateStorage();
    this.CartSize();
  }

  updateStorage = () => {
    const listProducts = localStorage.getItem('listCart');
    if (listProducts) {
      const list = JSON.parse(listProducts);
      this.setState({
        listCart: list,
      });
    }
  };

  fetchCategories = async () => {
    const categorias = await api.getCategories();
    this.setState({
      listCategories: categorias,
    });
  };

  CartSize = () => {
    const local = localStorage.getItem('listCart');
    if (local) {
      const quantity = JSON.parse(local).length;
      this.setState({
        cartSize: quantity,
      });
    }
  };

  // addCart = (item) => {
  //   this.setState((prevState) => (
  //     { listCart: [...prevState.listCart, item] }), () => {
  //     const { listCart } = this.state;
  //     localStorage.setItem('listCart', JSON.stringify(listCart));
  //   });
  // };

  updateCart = ({ target: { id } }) => {
    this.setState((prev) => ({
      listCart: [...prev.listCart, JSON.parse(id)],
    }), () => {
      const { listCart } = this.state;
      window.localStorage.setItem('listCart', JSON.stringify(listCart));
      this.CartSize();
    });
  };

  handleChecked = async ({ target }) => {
    const list = await api.getProductByCategoryId(target.id);
    const { results } = list;
    this.setState({
      result: results,
      resultado: true,
    });
  };

  handleSearch = async () => {
    const { searchValue } = this.state;
    const result = await api.getProductByQuery(searchValue);
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
    const { listCategories, result, resultado, cartSize } = this.state;
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
            <p data-testid="shopping-cart-size">{cartSize}</p>
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
                id={ JSON.stringify(item) }
                onClick={ this.updateCart }
              >
                Carrinho de Compras
              </button>
              {item.shipping.free_shipping && (
                <p data-testid="free-shipping">Free Shipping</p>)}
            </div>))
        )}
      </div>
    );
  }
}
export default Home;
