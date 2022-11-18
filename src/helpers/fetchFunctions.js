export const fetchProduct = async (id) => {
  if (!id) return Promise.reject(Error('ID não informado'));
  const api = (await (await fetch(`https://api.mercadolibre.com/items/${id}`)).json());
  return api;
};

export const fetchProductsList = async (search) => {
  if (!search) return Promise.reject(Error('Termo de busca não informado'));
  const api = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const retorno = await fetch(api);
  const resultado = await retorno.json();
  return resultado.results;
};
