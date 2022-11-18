import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

describe('Teste a função fetchProductsList', () => {
  it('Teste se fetchProductsList é uma função', () => {
		expect(typeof fetchProductsList).toBe('function')
	});
	it("Execute a função fetchProductsList com o argumento 'computador' e teste se fetch foi chamada;", async () => {
    fetchProductsList('computador');
		expect(fetch).toBeCalled();
	});
	it("Teste se o retorno da função fetchProductsList com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.", async () => {
		expect(await fetchProductsList('computador')).toBe(computadorSearch)
	})
  it("Execute a função fetchProductsList com o argumento 'computador' e teste se fetch foi chamada", () => {
		return fetchProductsList().catch(error => {
			expect(error.message).toBe('Termo de busca não informado');
		});
	});
});
