export async function getCategories() {
  const API = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const API = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
