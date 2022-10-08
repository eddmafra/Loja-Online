import React from 'react';
import * as api from '../services/api';

class Search extends React.Component {
  state = {
    searchValue: '',
    resultado: false,
    result: [],
  };

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = async () => {
    const { searchValue } = this.state;
    const result = await api.getProductByQuery(searchValue);
    console.log(result.results);
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
    const { searchValue, resultado, result } = this.state;
    return (
      <>
        <input
          name="searchValue"
          data-testid="query-input"
          type="text"
          value={ searchValue }
          onChange={ this.handleChange }
        />
        <input
          data-testid="query-button"
          type="button"
          onClick={ this.handleSearch }
        />
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
            </div>))
        )}
      </>
    );
  }
}

export default Search;
