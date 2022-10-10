import React from 'react';
import PropTypes from 'prop-types';

class Categorias extends React.Component {
  render() {
    const { categoryID, name, handleChecked } = this.props;
    return (
      <aside>
        <button
          data-testid="category"
          name="category"
          type="button"
          id={ categoryID }
          onClick={ handleChecked }
        >
          {name}
        </button>
      </aside>
    );
  }
}
export default Categorias;

Categorias.propTypes = {
  categoryID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChecked: PropTypes.func.isRequired,
};
