export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (search) => {
  try {
    if (!search) throw new Error('Termo de busca não informado');
    const api = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
    const retorno = await fetch(api);
    const resultado = await retorno.json();
    return [resultado, search];
  } catch (error) {
    return error.message;
  }
};
