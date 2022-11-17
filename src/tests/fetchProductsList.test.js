import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });	

  it('fetch é chamado ao executar fetchProductsList', async () => {
		const resultado = await fetchProductsList();
		expect(resultado).toBeDefined()
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
		const retorno = await fetchProductsList('computador');
		expect(retorno[1]).toBe('computador');
  });

	it("Teste se o retorno da função fetchProductsList com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.", async () => {
		const retorno = await fetchProductsList('computador')
		expect(retorno[0].results.length).toBe(computadorSearch.length);
	});

	it("Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: 'Termo de busca não informado'", async () => {
		const resultado = await fetchProductsList();
		expect(resultado).toBe('Termo de busca não informado');
	});
});
