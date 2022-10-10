import React from 'react';
import PropTypes from 'prop-types';

class Categorias extends React.Component {
// state = {
//     value: '',
//     result: [],
//   };

  // handleChecked = async () => {
  //   const { value } = this.state;
  //   const result = await api.getProductByQuery(value);
  //   console.log(result.results);
  //   const { results } = result;
  //   if (results.filter((el) => el.title.includes(value))) {
  //     this.setState({
  //       result: results,
  //     });
  //   }
  // };

  render() {
    const { categoryID, name, handleChecked } = this.props;
    // const { value, result } = this.state;
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
