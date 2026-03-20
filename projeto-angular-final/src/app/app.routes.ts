import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // --- nossas rotas para qualquer usuario ---
    {path: '', redirectTo: 'cardapio', pathMatch: 'full'},
    // acima, estamos definindo que , quando a rota "não for eapecificada" o browser vai renderizar o componente associado a rota 'cardapio' e esta rota aparecer, completa, no browser - algo semelhante a isto: http://localhost:4200/cardapio
    
    {
        path: 'cardapio',
        loadComponent: () => import('./components/produtos/vitrine/vitrine.component')
        .then(m => m.VitrineComponent)
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./components/auth/cadastro/cadastro.component')
        .then(m => m.CadastroComponent)
    },
     {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component')
        .then(m => m.LoginComponent)
    },

    // ----- ROTAS DE NIVEL USER - USUARIO COMUM ----
    {
        path: 'perfil',
        canActivate: [authGuard],
        children: [
            {
                path: 'checkout',
                loadComponent: () => import('./components/carrinho/checkout/checkout.component')
                .then(m => m.CheckoutComponent)
            }
        ]
    }
];
