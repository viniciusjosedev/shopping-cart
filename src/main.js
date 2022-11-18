import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

function loading(param) {
  if (param === true) {
    const tagP = document.createElement('p');
    tagP.className = 'loading';
    tagP.innerText = 'carregando...';
    return document.getElementsByClassName('products')[0]
      .appendChild(tagP);
  } return document.getElementsByClassName('loading')[0].remove();
}

async function search() {
  loading(true);
  const pull = await fetchProductsList('rx 580 4gb');
  loading(false);
  pull.forEach((elemento) => {
    document.getElementsByClassName('products')[0]
      .appendChild(createProductElement(elemento));
  });
}

search();

document.querySelector('.cep-button').addEventListener('click', searchCep);
