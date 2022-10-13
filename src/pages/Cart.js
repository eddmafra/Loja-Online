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

  remove = (id) => {
    const { products } = this.state;
    const cartTotal = products.filter((el) => el.id !== id);
    localStorage.setItem('listCart', JSON.stringify(cartTotal));
    this.setState({ products: cartTotal });
  };

  decrease = (id) => {
    const { products } = this.state;
    console.log(products);
    const newCart = products.filter((elemento) => (elemento.id === id)).slice(1);
    console.log(newCart);
    const carrinho = products.filter((elemento) => (elemento.id !== id));
    const totalItens = [...carrinho, ...newCart];
    localStorage.setItem('listCart', JSON.stringify(totalItens));
    this.setState({
      products: totalItens,
    });
  };

  productRender = () => {
    const { products } = this.state;
    const makeStringfy = products.map(JSON.stringify);
    const oneProduct = new Set(makeStringfy);
    return Array.from(oneProduct).map(JSON.parse);
  };

  increase = (id) => {
    const { products } = this.state;
    console.log(products);
    const newCart = products.filter((elemento) => (elemento.id === id));
    console.log(newCart);
    const carrinho = products.filter((elemento) => (elemento.id !== id));
    const totalItens = [...carrinho, ...newCart, newCart[0]];
    localStorage.setItem('listCart', JSON.stringify(totalItens));
    this.setState({
      products: totalItens,
    });
  };

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
          this.productRender().map((item, index) => (
            <section key={ index }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>
                R$
                {item.price}
              </p>
              <p data-testid="shopping-cart-product-quantity">
                {products.filter((pd) => pd.id === item.id).length}
              </p>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => this.increase(item.id) }
              >
                +
              </button>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => this.decrease(item.id) }
              >
                -
              </button>
              <button
                data-testid="remove-product"
                type="button"
                onClick={ () => this.remove(item.id) }
              >
                Remover
              </button>
            </section>))
        )}
      </>

    );
  }
}

export default Cart;
