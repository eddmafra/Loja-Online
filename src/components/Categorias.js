import React from 'react';
import PropTypes from 'prop-types';

class Categorias extends React.Component {
  render() {
    const { categoryID, name } = this.props;
    return (
      <aside>
        <label data-testid="category" htmlFor={ categoryID }>
          {name}
          <input
            name="category"
            type="radio"
            id={ categoryID }
            value={ name }
          />
        </label>
      </aside>
    );
  }
}
export default Categorias;

Categorias.propTypes = {
  categoryID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
