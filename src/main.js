import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

async function teste() {
  const pull = await fetchProductsList('computador');
  pull[0].results.forEach((elemento) => {
    document.getElementsByClassName('products')[0]
      .appendChild(createProductElement(elemento));
  });
}

teste();

document.querySelector('.cep-button').addEventListener('click', searchCep);
