import React from 'react';
import Search from '../components/Search';

class Home extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Search />
      </div>
    );
  }
}
export default Home;
