import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

function loading(param, classe) {
  if (param === true) {
    const tagP = document.createElement('p');
    tagP.className = classe;
    tagP.innerText = `${classe === 'loading' ? 'carregando...'
      : 'Algum erro ocorreu, recarregue a página e tente novamente'}`;
    return document.getElementsByClassName('products')[0]
      .appendChild(tagP);
  } return document.getElementsByClassName(classe)[0].remove();
}

async function search() {
  try {
    loading(true, 'loading');
    const pull = await fetchProductsList('computador');
    loading(false, 'loading');
    pull.forEach((elemento) => {
      document.getElementsByClassName('products')[0]
        .appendChild(createProductElement(elemento));
    });
  } catch (error) {
    // console.log(error.message);
    loading(false, 'loading');
    loading(true, 'error');
  }
}

search();

document.querySelector('.cep-button').addEventListener('click', searchCep);
