import React from 'react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  state = {
    products: null,
  };

  componentDidMount() {
    const getLocalStorage = localStorage.getItem('listCart');
    const returnGet = JSON.parse(getLocalStorage);
    this.setState({
      products: returnGet,
    });
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <Link to="/">Home</Link>
        {
          products === null
            && <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>
        }
        { products && (
          products.map((item, index) => (
            <section key={ index }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>
                R$
                {item.price}

              </p>
              <p data-testid="shopping-cart-product-quantity">
                {products.filter((product) => product.id === item.id).length}
              </p>
            </section>))
        )}
      </>

    );
  }
}

export default Cart;
