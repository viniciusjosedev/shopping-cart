import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
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

async function addCart(index) {
  const id = document.getElementsByClassName('product__id')[index].textContent;
  saveCartID(id);
  document.getElementsByClassName('cart__products')[0]
    .appendChild(createCartProductElement(await fetchProduct(id)));
}

async function search() {
  try {
    loading(true, 'loading');
    const pull = await fetchProductsList('redragon kumara');
    loading(false, 'loading');
    pull.forEach((elemento) => {
      document.getElementsByClassName('products')[0]
        .appendChild(createProductElement(elemento));
    });
    for (let index = 0; index < pull.length; index += 1) {
      document.getElementsByClassName('product__add')[index]
        .addEventListener('click', () => {
          addCart(index);
        });
    }
  } catch (error) {
    loading(false, 'loading');
    loading(true, 'error');
  }
}

search();

document.querySelector('.cep-button').addEventListener('click', searchCep);
