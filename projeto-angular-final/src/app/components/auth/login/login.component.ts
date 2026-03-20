import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  tituloComp: string = 'Login - acesse'
  subtituloComp: string = 'Acesse sua conta para fazer pedidos'
  // ---- 1º bloco
  private fb = inject(FormBuilder)// este recurso vai nos auxiliar na construção do fomulario
  private authService = inject(AuthService)
  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

  // definir algumas validações para a aplicação no form
  form: FormGroup = this.fb.group({    
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6) ]],    
  })

  // definir a função/método de login do usuario
  entrar(){
    // verificação se o contexto de envio é valido
    if(this.form.valid){
      const loginAcesso = this.form.value

      // agora, vamos usar o service para o envio dos dados
      this.authService.login(loginAcesso).subscribe({
        
        next: (usuario) => {
          if(usuario){
          this.snackBar.open(`Bem-vindo, ${usuario.nome}!`, 'Fechar', {
            duration: 3000
          })
          console.log("Este é o usuario logado: ", usuario)
          this.router.navigate(['/cardapio'])
        }else{
          this.snackBar.open('Email ou senha incorretos!', 'Fechar', { duration: 3000})
        }
      },error:(erro) =>{
          console.log('Erro ao conectar: ', erro)
          this.snackBar.open('Erro ao conectar! Tente novamente!', 'Fechar', 
            {duration: 3000})
        }
      })
    }
  }
}
