import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
      listCart: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ product: response });
  }

  addCart = (item) => {
    this.setState((prevState) => (
      { listCart: [...prevState.listCart, item] }), () => {
      const { listCart } = this.state;
      localStorage.setItem('listCart', JSON.stringify(listCart));
    });
  };

  handleButton = async () => {
    const { history: cart } = this.props;
    cart.push('/cart');
  };

  render() {
    const { product } = this.state;
    if (product) {
      return (
        <div>
          <p data-testid="product-detail-name">{ product.title }</p>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p data-testid="product-detail-price">{ product.price }</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addCart(product) }
          >
            Adicionar ao carrinho
          </button>
          <button
            type="button"
            onClick={ this.handleButton }
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </button>
        </div>
      );
    }
  }
}

export default Product;

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
