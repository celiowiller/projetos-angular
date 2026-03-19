// o objetivo deste service é: ser o contexto de checkout do nosso pedido
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartService } from '../../../services/cart.service';

// ainda iremos precisar de outros services
// import { AuthService} from '../../../services/auth.service
// import { PedidoService } from '../../../services/pedido.service'

// vamos precisar do model Pedido
import { Pedido } from '../../../models/pedido';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  // ======= 1º bloco: definir os recursos com os quais o componente irá operar ======
  // 1º passo: vamos praticar a injeção de dependencia - a partir do service
  //private cartService = inject(CartService)
  private readonly cartService = inject(CartService)

  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

 // 2º passo: fazer uso do signal - a partir do service - e "disponibiliza-lo" para a view do componente
 itensNoCarrinho = this.cartService.itens
 total = this.cartService.valorTotal

 // 3º passo: definir a função/método finalizarCompra(){}
 //const usuario = 



}
