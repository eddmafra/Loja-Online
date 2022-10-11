import React from 'react';

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
    const { id } = this.props;
    const getLocal = localStorage.getItem(id);
    this.setState({
      evaluation: (JSON.parse(getLocal)),
    });
  }

  loadEvaluation = () => {
    const { id } = this.props;
    const getEvaluation = localStorage.getItem(id);
    return JSON.parse(getEvaluation);
  };

  validateBtn = () => {
    const { email, rating } = this.state;
    const ratingValid = (rating >= 1);
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    const emailValid = emailRegex.test(email);
    const validate = emailValid && ratingValid;
    return validate;
  };

  handleChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  submitForms = (e) => {
    const { id } = this.props;
    e.preventDefault();
    localStorage.setItem(id, JSON.stringify(this.state));
    this.setState({
      rating: '',
      email: '',
      text: '',
    });
  };

  render() {
    return (
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
    );
  }
}

export default Form;
