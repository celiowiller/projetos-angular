import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoService } from '../../../services/pedido.service';
import { AuthService } from '../../../services/auth.service';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, ...MaterialModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {

  private pedidoService = inject(PedidoService)
  private authService = inject(AuthService)

  pedidos = this.pedidoService.pedidos

  ngOnInit(): void {
    const usuario = this.authService.usuarioLogado()

    console.log('Usuário no histórico:', usuario)

    if (usuario) {
      this.pedidoService
        .listarMeusPedidos(usuario.id)
        .subscribe() //OBRIGATÓRIO
    }
  }
}