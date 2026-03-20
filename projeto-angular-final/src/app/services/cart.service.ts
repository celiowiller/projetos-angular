import { Injectable, signal, computed } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /// persistir no localStorage
  private STORAGE_KEY = 'carrinho'
  // 1. definição do signal
  private _itens = signal<Produto[]>([])

  // 2. definir o elemento reativo de leitura
  itens = computed(() => this._itens())

  constructor() {
    const dados = localStorage.getItem(this.STORAGE_KEY)

    if (dados) {
      this._itens.set(JSON.parse(dados))
      console.log('Carrinho recuperado:', this._itens())
    }
   }

  // 3. calcular a quantidade de total de itens no carrinho
  quantidadeItens = computed(() => this._itens().length)

  // 4. calcular o valor total dos itens do carrinho (soma total de preços)
  valorTotal = computed(() => this._itens()
                                    .reduce((total, p) => total + p.precoProduto, 0 ))
  // valorTotal: propriedade que recebe como valor a soma total de preço do carrinho
  // computed(): é o elemento de "leitura" do signal que recebe como valor os itens do carrinho
  // reduce(): é um método JS para "transformar" um conjunto de dados - Array - em um unico valor - neste caso: é a soma total de preços

  // (total,: este é o Acumulador - parametro exigido pelo reduce: este parametro acumula os valores encontrados, no array, para a pratica a somatoria; ele inicia em zero - que é o valor indicado na instrução - , 0

  // p: é o parametro que faz "olha" para cada valor associado a propriedade precoProduto
  // => total + p.precoProduto : aqui esta a operação de soma acumulario dos valores de precoProduto.

  // 5. adicionar um produto ao carrinho
  adicionar(produto: Produto){
    // para adicionar o produto ao carrinho precisamos usar o método update para criar lista como o novo item/elemento
    this._itens.update(lista => {
      const novaLista = [...lista, produto]
       // salva sempre que muda
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(novaLista));

      return novaLista;
    })
    
  }

  // 6. remover um produto, do carrinho, pelo seu elemento identificador - ID
  remover(idProduto: number){
    this._itens.update(lista => {
      const novaLista = lista.filter(p => p.idProduto !== idProduto)

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(novaLista))

      return novaLista
    })
  }

  // 7. remover apenas uma unidade de um produto especifico 
  removerUmaUnidade(idProduto: number){
    this._itens.update(
      lista => {
        const index = lista.findIndex(p => p.idProduto === idProduto)
        // abaixo, estamos usando o verificação para o seguinte proposito: só vamos "entrar" neste if/verificação se o produto, realmente existri no carrinho
        if(index !== -1){ // TRUE
          const novaLista = [...lista]
          novaLista.splice(index, 1) // essa é a ferramenta de "corte" - o 1º parametro indica onde devemos começar cortar:  o valor do parametro index
          // o 2º parametro diz quantos itens devemos remover 

          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(novaLista))
          return novaLista
        } 
        return lista
      }
    )
  }


  // 8. limpando, quando necessario, o carrinho
  limparCarrinho(){
    this._itens.set([])
     localStorage.removeItem(this.STORAGE_KEY)
  }

}
