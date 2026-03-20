import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
 const auth = inject(AuthService);
  const router = inject(Router);

  // LOG DE DEBUG: Vamos ver o que o Guard está lendo na hora do erro
  console.log('Verificando acesso no Guard. Autenticado?', auth.isAutenticado());

  if (auth.isAutenticado()) {
    return true; 
  }

  return router.parseUrl('/login');
}