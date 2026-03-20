import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  tituloComp: string = 'Crie sua conta'
  subtituloComp: string = 'Entre para o nosso clube de cafés especiais'
  // ---- 1º bloco
  private fb = inject(FormBuilder)// este recurso vai nos auxiliar na construção do fomulario
  private authService = inject(AuthService)
  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

  // definir algumas validações para a aplicação no form
  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3) ]],
    sobrenome: ['', [Validators.required, Validators.minLength(3) ]],
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    role: ['USER']
  })

  // definir a função/método de submissão do cadastro
  submeter(){
    // verificação se o contexto de envio é valido
    if(this.form.valid){
      const novoUsuario = this.form.value

      // agora, vamos usar o service para o envio dos dados
      this.authService.cadastrar(novoUsuario).subscribe({
        next: () => {
          this.snackBar.open('Cadastro realizado com sucesso! Faça o login', 'Fechar', {
            duration: 3000
          })
          this.router.navigate(['/login'])
        }, 
        error:(erro) =>{
          console.log('Erro ao cadastrar: ', erro)
          this.snackBar.open('Erro ao cadastrar" Tente novamente!', 'Fechar', 
            {duration: 3000})
        }
      })
    }
  }
}
