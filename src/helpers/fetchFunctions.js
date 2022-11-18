export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (search) => {
  if (!search) return Promise.reject(Error('Termo de busca não informado'));
  const api = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const retorno = await fetch(api);
  const resultado = await retorno.json();
  return resultado.results;
};

fetchProductsList()
  .then((resolve) => console.log(resolve))
  .catch((error) => console.log(error.message));
