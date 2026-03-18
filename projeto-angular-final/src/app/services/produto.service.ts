import { Injectable, inject, signal, computed  } from '@angular/core';
// Injectable: recurso que possibilita à classe ser passivel de DI e, tambem, inidca que  este service pode ser "injetando" num componente - a partir do providedIn: root

// inject: função/método que auxilia na construção - direta - da DI

// signal: recurso que "torna" um elemento ao qual ele - signal - esta associado "vivo"; significa que o elemento logico "se torna" dinamico, ou seja, este elemento responde a qualquer alteração que à ele for atribuida - de forma automcatica! 

// computed: este, tambem, pode ser considerado um signal - do tipo computed - seu objetivo, ao se associar a um elemento lógico é: auxiliar na leitura de integrade dos dados; significa que -> ao usar computed estamos "impedindo" que, por exemplo, um componente externo mude os dados sem passar pelos métodos especifico para isso - método de service.
import { HttpClient } from '@angular/common/http';
// HttpClient: classe que será a injeção de dependencia para as requisições http

import { Produto } from '../models/produto';
// Produto: o model

import { tap } from 'rxjs';
// tap: este é um operador de assincronicidade - com origem no rxjs (biblioteca/extensão do js para os elementos "reativos" - é operador que proporciona que sempre que precisarmos fazer algo que NÃO MUDE O RESULTADO FINAL DA REQUISIÇÃO, o utilizamos )

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  /*
   ========================================================================
    1º BLOCO - DEFINIÇÃO DE RECURSOS PARA A CONSTRUÇÃO DO SERVICE
   ========================================================================
  */

   // 1º passo: vamos definir a injeção de dependencia - a partir da classe HttpClient
   // para este proposito vamos definir uma prop para receber como valor
   private http = inject(HttpClient)

   // 2º passo: definir a URL base para as requisições ao backend
   private readonly apiURL: string = 'http://localhost:3000/produtos'

   constructor() { }

   // 3º passo: definir um nova prop para receber como valor a estrutura do model para ser a nova fonte de dados - dados, estes, obtidos a partir da base
   private _produtos =  signal<Produto[]>([]) 

   // "criar uma capsula" para que, fora desta classe, seja possivel acessar o conteudo da propriedade privada produtos
   produtos = computed(() => this._produtos())

   /*
    acima, o 3º passo, podemos chamar reactive core (coração reativo do service); criamos um elemento signal - portanto, private _produtos, é um elemento dinamico - ou seja, estamos dizendo que se o conjunto de dados for alterado, em algum momento, todos os componentes que referenciam esta propriedade "receberão" esta alteração/atualização

    tambem, a "capsula" publica - produtos = computed() - determina que os valores, estritamente, atribuidos a _produtos devem ser lidos sem qualquer alteração - integros;
   */

  /*
   ========================================================================
    2º BLOCO - USO DE RECURSOS PARA A CONSTRUÇÃO DO SERVICE

    Abaixo, vamos definir o fluxo de dados referentes ao produto. Para isso, vamos
    estabelecer o CRUD - Create, Read, Update, Delete para este contexto
   ========================================================================
  */

   // 1º tarefa assincrona: READ - recuperar todos os dados da base e ter a possiblidade de lê-los/lista-los
   listarTodos(){
    // devemos fazer uma requisição - do tipo GET  - a base para recuperar os dados
    return this.http.get<Produto[]>(this.apiURL)
    .pipe(
      tap((dados) => this._produtos.set(dados))
    )
   }

   //  listarTodos(): método/tarefa assincrona que tem como responsabilidade o seguinte; fazer uma requisição http à base de dados e, de lá, recuperá-los - todos;

   // return this.http.get<Produto[]>(this.apiURL): esta instrução é a requisição que o método listarTodos() para  a base; quando este for chamado a sua execução, a expressão de retorno terá recebido todos os dados da base;

   // http: está é ainjeção de dependencia que nos auxilia a construir a requisição http - get (usada para obter os dados da base) - necessaria;
   
   // get : o verbo/método/requisição para a base de dados que pretendo obte-los 

   // <Produto[]>: aqui, temos o model Produto que define a generalização natural do método get; ou seja, estamos dizendo que queremos os dados mas de acordo com o conjunto de regras que estabelecemos no model Produto[] - e estes dados devem ser no contexto de array/conjunto de dados

   // (this.apiURL): nesta instrução estamos dizendo que nossa requisição get está sendo feita para um "endereço/endpoint/ponto final" bem especifico - o valor atribuido a propriedade apiURL: "http://localhost:3000/produtos" - significa que estamos acessando, via json-server e seu endereço base, a base de dados produtos[] (que está definida no arquivo db.json)

   // .pipe(): esta é a nossa "esteira"; significa que temos um elemento "tubo/duto" por onde os dados recuperados da base podem "chegar" ao front e, aqui, serem recebidos 

   // tap: é o nosso "observador/espião". Ele "intercepta" a resposta que obtivemos da base
   // this._produtos.set(dados): aqui, está ocorrendo o seguinte -> estamos "pegando" aquilo que obtivemos da basee "jogando/associando/atribuindo" dentro do nosso elemento signal. Em tese, a partir desse momento, o componente pode "consumir" os dados e exibi-los na view 

   // qual o elemento que determina que a função/método listarTodos() seja "interpretado" como uma tarefa assincrona / Observable?
   // R.: o protaganista HttpClient - é ele que determina que a nossa função/método seja "interpretado" como um elemento lógico Observable 

   /*
    listarDados(): Observable<Produto[]>{
      return this.http.get<Produto[]>(this.apiURL)

    }
   */


     // 2º tarefa assincrona: READ - recuperar um unico registro a partir de seu elemento identificador
     buscarPorId(id: number){
      return this.http.get<Produto>(`${this.apiURL}/${id}`)
     }

      // 3º tarefa assincrona: CREATE - inserir um novo registro à base
      criar(produto: Partial<Produto>){ // aqui, estamos tomando um certo cuidado! Qual? estamos dizendo que: vou enviar para a base um objeto que se parece com um Produto, mas ainda não temos todos os campos relativos a este produto - ainda! Geralmente, quando criamos um produto, por exemplo, ainda não temos o identificador - id - no nosso caso, quem irá gerar o id é a base de dados json-server; portanto, o uso do Partial<> tende a evitar que o TS possa nos dar/devolver algum tipo de erro - por falta deste id.
        return this.http.post<Produto>(this.apiURL, produto)
        .pipe(
          tap(
            (novoProduto) => {
              this._produtos.update((lista) => [...lista, novoProduto])
            }
          )
        )

      }

       // 4º tarefa assincrona: UPDATE - atualizar/alterar um registro - devidamente armazenado na base - desde que seja selecionado pelo seu elemento identificador
       atualizar(id: number, produto: Partial<Produto>){
        return this.http.put<Produto>(`${this.apiURL}/${id}`, produto)
        .pipe(
          tap((produtoAtualizado) => {
          // aqui, no pipe, estamos atualizando apenas o item que foi alterado - dentro do signal
          this._produtos.update((lista) => lista.map((p) => (p.idProduto === id ? produtoAtualizado : p)))
        }))
      }

       // 5º tarefa assincrona: DELETE - excluir o registro 
       excluir(id: number){
        return this.http.delete<void>(
          `${this.apiURL}/${id}`
        )
        .pipe(
          tap(() => {
          // removendo o item do signal para que seja possivel "refletir" na interface do usuario, de forma dinamica
          this._produtos.update((lista) => lista.filter((p) => p.idProduto !== id))
          })
        )
       } 
}
