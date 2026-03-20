// o objetivo deste service é: ser o contexto de checkout do nosso pedido
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartService } from '../../../services/cart.service';

// ainda iremos precisar de outros services
 import { AuthService} from '../../../services/auth.service'
 import { PedidoService } from '../../../services/pedido.service'

// vamos precisar do model Pedido
import { ItemPedido, Pedido } from '../../../models/pedido';
//import { ItemPedido } from '../../../models/item-pedido';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  tituloComp: string = 'Resumo do pedido'
  // ======= 1º bloco: definir os recursos com os quais o componente irá operar ======
  // 1º passo: vamos praticar a injeção de dependencia - a partir do service
  //private cartService = inject(CartService)
  public readonly cartService = inject(CartService)
  private readonly authService = inject(AuthService)
  private readonly pedidoService = inject(PedidoService)

  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

 // 2º passo: fazer uso do signal - a partir do service - e "disponibiliza-lo" para a view do componente
 // aqui, temos a lista de produtos do pedido
 itensNoCarrinho = this.cartService.itens
 total = this.cartService.valorTotal

 // 3º passo: definir a função/método finalizarCompra(){}
 finalizarCompra(){

  // 1º "pedaço" da função 
  const usuario = this.authService.usuarioLogado()
  console.log('Tentando finalizar o pedido. Usuario está logado: ', usuario)

  // 2º "pedaço" da função 
  if(!usuario){
    this.snackBar.open('Faça seu login para fechar o pedido!', 'OK', {duration: 3000})
    this.router.navigate(['/login'])
    //return
  }

  // 3º "pedaço" da função
  if(this.itensNoCarrinho().length === 0){
    this.snackBar.open('Seu carrinho está vazio!', 'OK', {duration: 3000})
    this.router.navigate(['/cardapio'])
    return
  }

  
 
  // 4º "pedaço" B da função - "montando" o objeto de dados de pedido
  const novoPedido: Pedido = {
     //usuarioId: usuario.id!,// pode ser usado?
    usuarioId: usuario!.id, // este caractere, aqui, é conhecido como Non-Null Assertion Operator(Operador de Não-Nulidade de dado)
    dataPedido: new Date().toISOString(),
    valorTotal: this.total(),
    //itens: this.itensNoCarrinho()
    itens: this.agruparItensNoCarrinho()
  }
  console.log('Pedido/objeto que vai ser enviado para base: ', novoPedido)

  // 5º "pedaço" da função - salvar o pedido
  this.pedidoService.salvarPedido(novoPedido).subscribe({
    next: (res) => {
      console.log('Resposta do back-end (Sucesso): ', res)
      this.snackBar.open('Pedido realizado com sucesso!☕☕☕', 'Sucesso', {duration: 3000})
      // pedido feito, limpar carrinho
      this.cartService.limparCarrinho()
      this.router.navigate(['/cardapio'])
    },
    error: (erro) => {
      console.error('Erro ao salvar o pedido no back-end: ', erro)
      this.snackBar.open('Erro ao salvar o pedido no back-end.', 'Erro', {duration: 3000})
    }
  })

 }

 // 4º "pedaço" A: definir uyma função que "transforme" nossa lista de produtos nos itens do nosso carinho
  private agruparItensNoCarrinho(): ItemPedido[]{
    const produtos = this.cartService.itens() // signal, aqui estamos "obtendo" seus valores
    const mapa = new Map<number, ItemPedido>() // aqui, estamos criando pares "chave-valor"; chave: idProduto - valor: é o objeto com a quantidade

    produtos.forEach(p =>{ // aqui, estamos percorrendo cada produto que o usuario colocou no carrinho
      if(mapa.has(p.idProduto)){ // aqui, estamos dizendo: "eue ja tenho este produto no meu carrinho?"
        const item = mapa.get(p.idProduto)! // se sim, buscamos o item...
        item.quantidade++ // ...e incrementamos sua quantidade em uma unidade  
      }else{
        // cria-se o produto dentro do carrinho e salvamos este novo objeto dentro do "dicionario/carrinho"
        mapa.set(p.idProduto, { ...p, quantidade: 1})
      }
    })
    return Array.from(mapa.values()) // aqui, pegamos cada item e organizamos na estrutura de "carrinho" de compra.
  } // esta função nos da uma estrutura organizada de itens de carrinho; algo semelhante a esta estrutura -> Machiatto | Quantidade: 3

 }
