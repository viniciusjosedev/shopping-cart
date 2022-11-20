export const getAddress = async (cep) => {
  const firstApi = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const secondApi = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  return Promise.any([firstApi, secondApi]);
};

export const searchCep = async () => {
  const tagSpan = document.getElementsByClassName('cart__address')[0];
  try {
    const input = document.getElementsByClassName('cep-input')[0].value;
    const resultado = await getAddress(input);
    const objeto = await resultado.json();
    if (objeto.address !== undefined) {
      const { address, district, city, state } = objeto;
      tagSpan.innerText = `${address} - ${district} - ${city} - ${state}`;
      return;
    } if (objeto.street !== undefined) {
      const { street, neighborhood, city, state } = objetjo;
      tagSpan.innerText = `${street} - ${neighborhood} - ${city} - ${state}`;
      return;
    } throw new Error('CEP não encontrado');
  } catch {
    tagSpan.innerText = 'CEP não encontrado';
  }
};
