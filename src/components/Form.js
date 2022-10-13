import React from 'react';
import PropTypes from 'prop-types';

const localSave = {
  rating: '',
  email: '',
  text: '',
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      ...localSave,
      evaluation: [],
      validate: false,
    };
  }

  async componentDidMount() {
    const { productId } = this.props;
    const getLocal = localStorage.getItem(productId);
    this.setState({
      // evaluation: (JSON.parse(getLocal) || []),
    });
  }

  loadEvaluation = () => {
    const { productId } = this.props;
    console.log(productId);
    const getEvaluation = localStorage.getItem(productId);
    return JSON.parse(getEvaluation);
  };

  handleChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  submitForms = (r) => {
    r.preventDefault();
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    const { productId } = this.props;
    console.log(productId);
    const { email, rating, text } = this.state;
    const prevEvaluation = this.loadEvaluation();
    const validateEmail = emailRegex.test(email);
    const newEvaluation = { email, rating, text };
    if (rating && validateEmail) {
      localStorage
        .setItem(productId, JSON.stringify([...prevEvaluation], newEvaluation));
      this.setState({
        ...localSave,
        validate: false,
        // evaluation: this.loadEvaluation(),
      });
    } else {
      this.setState({
        validate: true,
      });
    }
  };

  render() {
    const { validate } = this.state;
    return (
      <div>
        <form>
          <label
            data-testid="product-detail-email"
            htmlFor="emailEvaluation"
          >
            <input
              type="text"
              name="email"
              id="emailEvaluation"
              placeholder="E-mail"
              onChange={ this.handleChange }
            />
          </label>
          {[1, 2, 'foo', 'bar', 'baz'].map((_, i) => (
            <label data-testid={ `${i + 1}-rating` } htmlFor={ `rate${i}` } key={ i }>
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
        {validate && <p data-testid="error-msg">Campos inválidos</p>}
        {/* <ul>
          {
            evaluation.map((e, i) => (
              <li key={ i }>
                <h1 data-testid="review-card-email">{e.email}</h1>
                <h2 data-testid="review-card-rating">{e.rating}</h2>
                <p data-testid="review-card-evaluation">{e.text}</p>
              </li>
            ))
          }
        </ul> */}
      </div>
    );
  }
}

export default Form;

Form.propTypes = {
  productId: PropTypes.string.isRequired,
};
