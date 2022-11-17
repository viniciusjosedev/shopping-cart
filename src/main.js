import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

// async function teste() {
//   const pull = await fetchProductsList('dakimura');
//   const resultado = await pull[0].results;
//   resultado.forEach((elemento) => {
//     const tag = createProductElement(elemento);
//     document.getElementsByClassName('products')[0]
//       .appendChild(tag);
//   });
// }

// teste();

document.querySelector('.cep-button').addEventListener('click', searchCep);
