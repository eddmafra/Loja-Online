import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

const localSave = {
  rating: 0,
  email: '',
  text: '',
};
class Product extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
      ...localSave,
      evaluation: [],
      validate: true,
      // listCart: [],
      cartSize: 0,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const getLocal = localStorage.getItem(id);
    const response = await getProductById(id);
    this.setState({
      product: response,
      evaluation: ((getLocal) ? JSON.parse(getLocal) : []),
    });
    this.CartSize();
  }

  CartSize = () => {
    const local = localStorage.getItem('listCart');
    if (local) {
      const quantity = JSON.parse(local).length;
      this.setState({
        cartSize: quantity,
      });
    }
  };

  addCart = () => {
    const { product } = this.state;
    const listProducts = localStorage.getItem('listCart');
    if (listProducts) {
      const list = JSON.parse(listProducts);
      localStorage.setItem('listCart', JSON.stringify([...list, product]));
    } else {
      localStorage.setItem('listCart', JSON.stringify([product]));
    }
    this.CartSize();
  };

  loadEvaluation = () => {
    const { match: { params: { id } } } = this.props;
    const getEvaluation = localStorage.getItem(id);
    return (getEvaluation) ? JSON.parse(getEvaluation) : [];
  };

  handleButton = async () => {
    const { history: cart } = this.props;
    cart.push('/cart');
  };

  handleChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  submitForms = (e) => {
    e.preventDefault();
    const { match: { params: { id } } } = this.props;
    const { email, rating, text } = this.state;
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    const validateEmail = emailRegex.test(email);
    const prevEvaluation = this.loadEvaluation();
    if (rating && validateEmail) {
      const newEvaluation = { email, rating, text };
      localStorage
        .setItem(id, JSON.stringify([...prevEvaluation, newEvaluation]));
      const evaluationList = localStorage.getItem(id);
      this.setState({
        email: '',
        rating: 0,
        text: '',
        validate: true,
        evaluation: JSON.parse(evaluationList),
      });
    } else {
      this.setState({
        validate: false,
      });
    }
  };

  render() {
    const { product, validate, evaluation, email, text, cartSize } = this.state;
    if (product) {
      return (
        <>
          <div>
            <p data-testid="product-detail-name">{ product.title }</p>
            <img
              data-testid="product-detail-image"
              src={ product.thumbnail }
              alt={ product.title }
            />
            <p data-testid="product-detail-price">{product.price}</p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.addCart }
            >
              Adicionar ao carrinho
            </button>
            <button
              type="button"
              onClick={ this.handleButton }
              data-testid="shopping-cart-button"
            >
              Carrinho de compras
              <p data-testid="shopping-cart-size">{cartSize}</p>
            </button>
          </div>
          <form>
            <label
              htmlFor="email"
            >
              <input
                value={ email }
                type="text"
                name="email"
                id="emailEvaluation"
                placeholder="E-mail"
                onChange={ this.handleChange }
                data-testid="product-detail-email"
              />
            </label>
            {['1', '2', '3', '4', '5'].map((_, i) => (
              <label
                data-testid={ `${i + 1}-rating` }
                htmlFor={ `rate${i}` }
                key={ i }
              >
                <input
                  className="radioStar"
                  type="radio"
                  name="rating"
                  id={ `rate${i}` }
                  value={ i + 1 }
                  onClick={ this.handleChange }
                />
                { i + 1}
              </label>))}
            <textarea
              name="text"
              id="description"
              cols="30"
              rows="10"
              placeholder="Mensagem (opcional)"
              onChange={ this.handleChange }
              data-testid="product-detail-evaluation"
              value={ text }
            />
            <button
              data-testid="submit-review-btn"
              type="submit"
              onClick={ this.submitForms }
            >
              Avaliar
            </button>
          </form>
          {!validate && <p data-testid="error-msg">Campos inválidos</p>}
          <ul>
            { evaluation.map((e, i) => (
              <li className="evaluation" key={ i }>
                <p data-testid="review-card-email">{e.email}</p>
                <p data-testid="review-card-rating">
                  {e.rating}
                </p>
                <p data-testid="review-card-evaluation">
                  {e.text}
                </p>
              </li>
            ))}
          </ul>
        </>
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
