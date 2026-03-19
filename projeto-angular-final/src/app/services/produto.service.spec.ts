import { TestBed } from '@angular/core/testing'; // a ferramenta principal do Angular para testes. Ele nos oferece como  recurso principal a possibilidade de criar o módulo MOCK para os testes

import { provideHttpClient } from '@angular/common/http'; // recurso necessario para uso do HttpClient - nos auxilia nas requisições http

import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
/*
  provideHttpClientTesting: "a nossa peça chave "; este recurso substitui o "envio real" de dados via http. Sem ele, nossos testes tentariam "bater" numa base real.
  
  HttpTestingController: podemos dizer que este recurso é um "controle remoto" da nossa simulação; é com este recurso o controle do teste - da seguinte forma: como se dissessemos " faz de conta que nosso servidor enviou/recebeu estes dados"
*/
import { Produto } from '../models/produto';
import { ProdutoService } from './produto.service'; // aqui esta o nosso service

describe('ProdutoService - CRUD', () => { // a string é apenas o label do nosso teste! o método describe() "agrupa" um conjunto de testes que queremos excutar - neste caso o CRUD

  let service: ProdutoService; // a variavel que "guarda" a instancia  do nosso service - aqui, esta declarada

  let httpMock: HttpTestingController

  // aqui, é importante indicarmos para "onde" as nossas requisições irão apontar - nosso db.json
  const API = 'http://localhost:3000/produtos'

  // O "CORAÇÃO" DA NOSSA CONFIGURAÇÃOD E TESTES (beforeEach)
  beforeEach(() => { // quando chamado, o método roda uma vez antes de cada teste. Isso garante que cada teste comece sempre do zero, sem "sujeiras" eventuais - por exemplo, de testes anteriores

    TestBed.configureTestingModule({
      // aqui, dentro do metodo  indicado vamos configurar o modulo do nosso teste; para este proposito vamos definir os "provedores" dos recursos necessarios para a execução dos testes
      providers:[
        ProdutoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProdutoService); // aqui, temos um "pedido" ao Angular: criar/injentar o service para o nosso laboratorio de testes - "guardando" na variavel service

    // definir uma nova prop para criar o "controlador" dos testes
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => httpMock.verify()) // aqui, o método "roda" depois de cada teste
  // httpMock.verifiy(): este é o elemento que vamos apelidar de "fiscal" dos testes. O motivo é: ele verifica se nós, evetualmente, esquecemos de algum "coisa" que deveria ser observada. Como, por exemplo: uma requisação em aberto/aberta, se tentamos fazer alguma requisação  que não prevista nos testes, etc....

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // --- TESTE: LER (LISTAR) ---
  //é onde a "mão na massa" acontece. Cada it() representa um comportamento único que você quer testar.
 it('deve listar produtos e atualizar o Signal', () => {
	// 1. ARRANJE (Preparação)-> O it vem do inglês "It should" (Ele deve). É uma frase que descreve o que o teste espera. Se o teste falhar, o Karma dirá: "Falha em: ProdutoService deve criar um novo produto...".
    const mockProdutos: Produto[] = [{ idProduto: 1, nomeProduto: 'Café', precoProduto: 10 } as Produto]
	
    // 2. ACT (Ação) -> O Objeto Mock (Dummy)const novoProduto = { ... }: Criamos um "boneco de testes". Não precisamos de um produto real do banco, apenas um objeto que siga a interface Produto.
    service.listarTodos().subscribe()
	
    // 3. ASSERT (Verificação do HTTP) -> O Gatilho (A Execução) service.criar(novoProduto).subscribe(): Chamamos o método do seu serviço. IMPORTANTE: No Angular, o HttpClient só envia a requisição se houver um .subscribe(). Sem ele, o teste não faria nada.
	// 4. ASSERT (Verificação do Estado/Signal) -> O "Expect" do HTTP (O Interceptador) const req = httpMock.expectOne(API): Aqui o teste para e pergunta: "O código tentou enviar algo para a URL 'http://localhost:3000/produtos'?". Se o serviço não disparou a chamada, o teste morre aqui com erro. expect(req.request.method).toBe('POST'): Verificamos se você usou o "verbo" correto. Se você usou GET em vez de POST, o teste falha.
    const req = httpMock.expectOne(API)
    req.flush(mockProdutos)
	
	//expect(service.produtos().length).toBe(1): Agora que o "servidor" respondeu, verificamos se a lógica de atualização do seu Signal funcionou. Nós "lemos" o Signal service.produtos() e conferimos se ele agora tem 1 item. Se tiver 0 ou 2, algo está errado na sua lógica de update.
    expect(service.produtos().length).toBe(1)
    expect(service.produtos()).toEqual(mockProdutos)
  })

  it('deve buscar um produto por ID', () => {
    const mock = { idProduto: 1, nomeProduto: 'Expresso' } as Produto
    
    service.buscarPorId(1).subscribe(p => expect(p.nomeProduto).toBe('Expresso'))
    
    const req = httpMock.expectOne(`${API}/1`)
    req.flush(mock);
  }) 


  // ---- TESTE: CRIAR UM REGISTRO (CREATE) ------
  // it(): é metodo que "define" o caso de teste unitario
  it('deve criar um novo produto, fazer o POST e atualizar o signal', () => {
    // 1. definição do produto que queremos criar
    const novoProduto: Produto = {
      idProduto: 25,
      nomeProduto: 'Café especial Machiatto',
      precoProduto: 12.5,
      imagemProduto: 'url-imagem',
      descricao: 'Café cremoso com calda de caramelo'
    }
    // 2. garantir que o nosso elemento signal inicie vazio
    // objeto - DI ['propriedade']: que esta "escrita"/ sintaxe é especifica para testes
    // @ts-ignore
    service['_produtos'].set([])

    // 3. aqui, vamos acessar e chamar a execução o método criar
    service.criar(novoProduto).subscribe(
      (res) => {
        // verificar se o retorno da função é o produto que enviamos
        expect(res).toEqual(novoProduto)
      }
    )

    // 4. validação da requisição http
    const req = httpMock.expectOne(API) // aqui, estamos dizendo que precisamos somente de uma requisição para um determinado endereço; o valor dado a const API
    expect(req.request.method).toBe('POST') // via request, estamos indicando qual é o método/verbo que estamos usando para esta requisição
    expect(req.request.body).toEqual(novoProduto) // fazendo um "comparação" entre: aquilo que está no "corpo" da requisição - o pacote de dados que esta sendo enviado - em relação ao valor do objeto novoProduto

    // 5. agora, vamos simular a resposta de um servidor que indique sucesso na requisição - status 201 
    req.flush(novoProduto)

    // 6. validação do signal: o item deve ser adicionado a lista - considerando o contexto de reativo que implementos no service e reflete no componente
    const listaFinal = service.produtos()

    // 7. veredito do teste: verificar se o signal reflete, realmente, essa "inserção-teste" de produto
    expect(listaFinal.length).toBe(1) // aqui, estamos dizendo aquilo que esperamos: que o tamanho da nossa lista seja de 1 novo elemento
    expect(listaFinal[0].nomeProduto).toBe('Café especial Machiatto') 
    // listaFinal[0]: acessando o 1º elemento item da nossa lista
    // .nomeProduto: acessando, especificamente, a propriedade referente ao nome deste produto
    // toBe('Café especial Machiatto'): aqui, estamos dizendo que: esperamos, exatamente este valor para a propriedade nomeProduto
  })


  // --- TESTE: ATUALIZAR (UPDATE) ---
 
it('deve atualizar um produto e refletir no Signal', () => {
  const produtoOriginal: Produto = { 
    idProduto: 1, 
    nomeProduto: 'Café Antigo', 
    precoProduto: 10, 
    imagemProduto: '', 
    descricao: '' 
  }

  // Simula que o produto já está no Signal
  service['_produtos'].set([produtoOriginal])

  const produtoEditado: Produto = { ...produtoOriginal, nomeProduto: 'Café Atualizado' }

  // Passando o ID e o Objeto
  service.atualizar(produtoEditado.idProduto, produtoEditado).subscribe()

  const req = httpMock.expectOne(`${API}/${produtoEditado.idProduto}`)
  expect(req.request.method).toBe('PUT')
  req.flush(produtoEditado)

  // Verifica se o Signal foi atualizado corretamente
  expect(service.produtos()[0].nomeProduto).toBe('Café Atualizado')
})

  // --- TESTE: EXCLUIR (DELETE) ---
  it('deve excluir um produto e remover do Signal', () => {
    const p1 = { idProduto: 1, nomeProduto: 'A', precoProduto: 5, imagemProduto: '', descricao: '' }
    const p2 = { idProduto: 2, nomeProduto: 'B', precoProduto: 5, imagemProduto: '', descricao: '' }
    
    // Preenche o Signal com dois produtos
    // @ts-ignore
    service['_produtos'].set([p1, p2])

    service.excluir(1).subscribe()

    const req = httpMock.expectOne(`${API}/1`)
    expect(req.request.method).toBe('DELETE')
    req.flush({}); // Servidor responde com sucesso vazio

    // Verifica se restou apenas o produto que não foi excluído
    expect(service.produtos().length).toBe(1)
    expect(service.produtos()[0].idProduto).toBe(2)
  })
});
