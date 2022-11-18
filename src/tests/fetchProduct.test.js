import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {

  it("Teste se fetchProduct é uma função;", () => {
    expect(typeof fetchProduct).toBe('function')
  });

	it("Execute a função fetchProduct com o argumento do produto 'MLB1405519561' e teste se fetch foi chamada", () => {
		fetchProduct('MLB1405519561');
		expect(fetch).toBeCalled();
	});

	it("Teste se, ao chamar a função fetchProduct com o argumento do produto 'MLB1405519561', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/items/MLB1405519561'", () => {
		fetchProduct('MLB1405519561');
		expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1405519561')
	});

	it("Teste se o retorno da função fetchProduct com o argumento do produto 'MLB1405519561' é uma estrutura de dados igual ao objeto produto que já está importado no arquivo.", async () => {
		expect(await fetchProduct('MLB1405519561')).toEqual(product);
	});

	it("Teste se, ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: 'ID não informado'", () => {
		return fetchProduct().catch(error => {
			expect(error.message).toBe('ID não informado')
		})
	});
	
});
