import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
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

async function priceTotal(ids) {
  const tagPrice = document.getElementsByClassName('total-price')[0];
  if (typeof ids === 'object') {
    const list = [];
    for (let index = 0; index < ids.length; index += 1) {
      list.push(fetchProduct(ids[index]));
    }
    let soma = 0;
    return Promise.all(list).then((resultado) => resultado.forEach((elemento, index) => {
      soma += elemento.price;
      if (resultado.length - 1 === index) {
        tagPrice.innerText = `${soma
          .toFixed(2)}`;
      }
    }));
  } const id = document.getElementsByClassName('product__id')[ids].textContent;
  const objeto = await fetchProduct(id);
  tagPrice
    .innerText = `${(parseFloat(tagPrice.textContent) + objeto.price).toFixed(2)}`;
}

async function ifObject(ids, size) {
  const list = [];
  for (let index = 0; index < size; index += 1) {
    list.push(fetchProduct(ids[index]));
  }
  priceTotal(ids);
  await Promise.all(list).then((resultado) => resultado.forEach((elemento) => document
    .getElementsByClassName('cart__products')[0]
    .appendChild(createCartProductElement(elemento))));
}

export default async function addCart(ids, size) {
  if (typeof ids === 'object') {
    await ifObject(ids, size);
  }
  if (typeof ids === 'number') {
    priceTotal(ids);
    const id = document.getElementsByClassName('product__id')[ids].textContent;
    saveCartID(id);
    document.getElementsByClassName('cart__products')[0]
      .appendChild(createCartProductElement(await fetchProduct(id)));
  }
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

function init() {
  search();
  addCart(getSavedCartIDs(), getSavedCartIDs().length);
}

window.onload = init;

document.querySelector('.cep-button')
  .addEventListener('click', async () => searchCep());
