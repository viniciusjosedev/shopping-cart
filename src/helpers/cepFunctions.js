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
    if (resultado.url === `https://cep.awesomeapi.com.br/json/${input}`) {
      const { address, district, city, state } = await resultado.json();
      if (!address) throw new Error('CEP não encontrado');
      tagSpan.innerText = `${address} - ${district} - ${city} - ${state}`;
      return;
    } if (resultado.url === `https://brasilapi.com.br/api/cep/v2/${input}`) {
      const { street, neighborhood, city, state } = await resultado.json();
      if (!street) throw new Error('CEP não encontrado');
      tagSpan.innerText = `${street} - ${neighborhood} - ${city} - ${state}`;
      return;
    }
  } catch (error) {
    tagSpan.innerText = error.message;
  }
};
