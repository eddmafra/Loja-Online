import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  state = {
    searchValue: '',
  };

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const { searchValue } = this.state;
    const { handleSearch } = this.props;
    return (
      <>
        <input
          name="searchValue"
          data-testid="query-input"
          type="text"
          value={ searchValue }
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ handleSearch }
        >
          Buscar
        </button>
      </>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
