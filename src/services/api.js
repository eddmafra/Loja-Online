export async function getCategories() {
  const API = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const API = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const API = `https://api.mercadolibre.com/items/${productId}`;
  const request = await fetch(API);
  const response = await request.json();
  return response;
}

export async function getProductByQuery(QUERY) {
  const API = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

export async function getProductByCategoryId(CATEGORY_ID) {
  const API = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}
