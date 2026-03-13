// importando o model e a fonte de dados
import { Produto } from "../models/produto";
import { LISTA_PRODUTOS } from "../dados/fonteDados";


/*import { Injectable } from '@angular/core';

// não é o decorator @Injectable que define o novo "papel" desta classe - ser um service
// este decorator - não é ele, necessariamente, que "faz" o serivce funfar!!!
@Injectable({
  providedIn: 'root'
})*/


export class ProdutoService {
  // 1º passo: definir uma propriedade que receberá, como valor, a fonte de dados
  private listaProdutos: Produto[] = LISTA_PRODUTOS

  constructor() { }

  // 2º passo: definir um metodo que possa retornar a nossa lista de produtos
  obterLista(): Produto[]{
    return this.listaProdutos
  }
}
