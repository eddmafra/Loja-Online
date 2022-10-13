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
      product: {},
      ...localSave,
      evaluation: [],
      validate: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const getLocal = localStorage.getItem(id);
    getProductById(id)
      .then((data) => this.setState({
        product: data,
        evaluation: ((getLocal) ? JSON.parse(getLocal) : []),
      }));
  }

  handleButton = async () => {
    const { history: cart } = this.props;
    cart.push('/cart');
  };

  loadEvaluation = () => {
    const { match: { params: { id } } } = this.props;
    const getEvaluation = localStorage.getItem(id);
    return (getEvaluation) ? JSON.parse(getEvaluation) : [];
  };

  handleChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  submitForms = () => {
    const { match: { params: { id } } } = this.props;
    const { email, rating, text } = this.state;
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    const validateEmail = emailRegex.test(email);
    const prevEvaluation = this.loadEvaluation();
    if (rating && validateEmail) {
      const newEvaluation = { email, rating, text };
      localStorage
        .setItem(id, JSON.stringify([...prevEvaluation, newEvaluation]));
      this.setState({
        ...localSave,
        validate: true,
        evaluation: this.loadEvaluation(),
      });
    } else {
      this.setState({
        validate: false,
      });
    }
  };

  render() {
    const { product, validate, evaluation } = this.state;
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
            <p data-testid="product-detail-price">{ product.price }</p>
            <button
              type="button"
              data-testid="shopping-cart-button"
              onClick={ this.handleButton }
            >
              Adcionar ao carrinho
            </button>
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
          <div>
            <form>
              <label
                htmlFor="emailEvaluation"
=======
          <div>
            <form>
              <label
                htmlFor="email"
>>>>>>> f519e33 (requisito 11 - feito para pull)
              >
                <input
                  data-testid="product-detail-email"
                  type="text"
                  name="email"
<<<<<<< HEAD
                  id="emailEvaluation"
=======
                  id="email"
>>>>>>> f519e33 (requisito 11 - feito para pull)
                  placeholder="E-mail"
                  onChange={ this.handleChange }
                />
              </label>
              {[1, 2, 'foo', 'bar', 'baz'].map((_, i) => (
<<<<<<< HEAD
                <label data-testid={ `${i + 1}-rating` } htmlFor={ `rate${i}` } key={ i }>
                  <input
=======
                <label
                  htmlFor={ `rate${i}` }
                  key={ i }
                >
                  <input
                    data-testid={ `${i + 1}-rating` }
>>>>>>> f519e33 (requisito 11 - feito para pull)
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
                data-testid="product-detail-evaluation"
                name="text"
                id=""
                cols="30"
                rows="10"
                placeholder="Mensagem (opcional)"
                onChange={ this.handleChange }
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
<<<<<<< HEAD
              { evaluation && evaluation.map((e, i) => (
                <li className="evaluation" key={ i }>
                  <p data-testid="review-card-email">{e.email}</p>
                  <p data-testid="review-card-rating">
                    Nota:
                    {' '}
                    {e.rating}
                  </p>
                  <p data-testid="review-card-evaluation">
                    Comentário:
                    {' '}
                    {e.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
=======
          <Form productId={ product.id } />
>>>>>>> d2f2487 (Req 11 - commit para pull)
=======
              {console.log(evaluation)}
              {
                evaluation && evaluation.map((e, i) => (
                  <li className="evaluation" key={ i }>
                    <p data-testid="review-card-email">{e.email}</p>
                    <p data-testid="review-card-rating">
                      Nota:
                      {' '}
                      {e.rating}
                    </p>
                    <p data-testid="review-card-evaluation">
                      Comentário:
                      {' '}
                      {e.text}
                    </p>
                  </li>
                ))
              }
            </ul>
          </div>
>>>>>>> f519e33 (requisito 11 - feito para pull)
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
