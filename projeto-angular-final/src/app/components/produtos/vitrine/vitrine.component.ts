import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CartService } from '../../../services/cart.service';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto';

@Component({
  selector: 'app-vitrine',
  imports: [CommonModule, ...MaterialModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent implements OnInit {
  tituloComp: string = 'Nossos cafés - muito especiais'
  // ======= 1º bloco: definir os recursos com os quais o componente irá operar ======
  // 1º passo: vamos praticar a injeção de dependencia - a partir do service
   private produtoService = inject(ProdutoService)
   private cartService = inject(CartService)
   private snackBar = inject(MatSnackBar)

  // 2º passo: fazer uso do signal - a partir do service - e "disponibiliza-lo" para a view do componente
  listaProdutos = this.produtoService.produtos

  // 3º passo: fazer uso do angular hook ngOnInit() para "priorizar" o carregamento da lista de produtos - assim que o componente estiver "vivo" - no browser
  ngOnInit(): void {
      this.produtoService.listarTodos().subscribe() // aqui, ao utilizarmos o subscribe() estamos "executando" a tarefa assincrona / "cumprindo a promessa feita lá no service"
  }

  // 4º passo: definir o método de inserção de um produto no carrinho
  adicionarAoCarrinho(produto: Produto){
    console.log('Adicionando ao carrinho: ', produto)
    this.cartService.adicionar(produto)

  // 5º passo: definir o feedback visual - snack bar
  this.snackBar.open(
    `${produto.nomeProduto} adiconado ao carrinho!`, 'OK',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
   )
   
  }



}
