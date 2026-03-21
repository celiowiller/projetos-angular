import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ...MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private authService = inject(AuthService)
  private cartService = inject(CartService)
  private router = inject(Router)

  // signals
  usuario = this.authService.usuarioLogado
  isAutenticado = this.authService.isAutenticado
  isAdmin = this.authService.isAdmin

  quantidadeCarrinho = this.cartService.quantidadeItens

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}