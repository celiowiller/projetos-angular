import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cadastro } from '../models/cadastro';
import { Login } from '../models/login';
import { tap, map } from 'rxjs' // por que map?

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private STORAGE_KEY = 'usuario_logado'
  // ====== 1º bloco =======
  private http = inject(HttpClient)
  private apiURL = 'http://localhost:3000/usuarios'
  // ¨*******
  // Criamos uma função auxiliar para ler o "disco"
  // leitura inicial
  usuarioSalvo = localStorage.getItem(this.STORAGE_KEY)
  // definição do signal

  private _usuarioLogado = signal<Cadastro | null>(null)

  //****Iniciamos o Signal com o valor que já está lá (ou null)
  /*private _usuarioLogado = signal<Cadastro | null>(
    this.usuarioSalvo ? JSON.parse(this.usuarioSalvo) : null
  )*/

   // definição do computed
  usuarioLogado = computed(() => this._usuarioLogado())

  // definir uma verificação de nivel de usuario
  // aqui, abaixo, nas duas props, estamos observando o signal do usuario logado e respondendo a duas questoes: 
  // 1 - se ele, usuario, esta logado
  // 2 - se ele, usuario, esta logado e é um admin
  // operador Double Bang: um instrumento do JS que nos auxilia a estabelecer um processo de conversão de qualquer valor par aum valor booleano 
  isAutenticado = computed(() => !!this._usuarioLogado()) // este é nosso "porteiro":
 
  // porque, aqui, percebemos se o usuario pode ou não acessar alguma área restrita da aplicaçao
  // se _usuarioLogado() tiver um objeto(se estiver presente - a partir do login)-> true
  // se _usuarioLogado() for null ou undefined -> false

  isAdmin = computed(() => this._usuarioLogado()?.role === 'ADMIN')
  // acima, estamos observando o status de nivel de usuario; se ele é um ADMIN com privilegio de acesso total ao sistema
  // usuarioLogado()?: o ponto de interrogação é o operador optional/optional chaining; aqui, o operador obervado se o usuario esta logado - se existe o objeto - se for considerado null ou undefined o codigo não "quebra" e retorna um undefined

  constructor() { 
    // ****. Ao iniciar o serviço, tentamos recuperar o usuário salvo
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);

      if (dadosSalvos) {
        const usuario = JSON.parse(dadosSalvos);
        console.log('Recuperado do localStorage:', usuario);
        this._usuarioLogado.set(usuario);
      }
  }

  // ====== 2º bloco ========
  // definir a função de cadastro de usuario
  cadastrar(usuario: Partial<Cadastro>){
    return this.http.post<Cadastro>(this.apiURL, usuario)
    .pipe(
      tap((novoUsuario) =>{
        console.log('Usuario Cadastrado com sucesso: ', novoUsuario)
      })
    )
  }


  // definir login
  login(credenciais: Login){
    // observar, posteriormente, outra forma de "passar" as credenciais de acesso
    return this.http.get<Cadastro[]>(`${this.apiURL}?email=${credenciais.email}&password=${credenciais.password}`)
    .pipe(
      map(usuarios => usuarios[0] || null),
      tap((usuario) => {
        if(usuario) {
          console.log('Gravando usuário no Signal:', usuario); 
          this._usuarioLogado.set(usuario)
          // adicionando o usuario no localStorage
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
        }
      })
    )
  }
  

  /*
     acima, estamos fazendo uma busca "filtrada": porque estamos observando se o usuario consta na base

     map(usuarios => usuarios[0] || null),: o json-sever esta "respondendo" com uma lista; então é aí que entra o map() - porque estamos dizendo: se a lista estiver vazia me um null; caso o contrario, me de o 1º item dessa lista usuarios[0] 
  */

     // definir a função/método logout
     logout(){
      this._usuarioLogado.set(null);
      localStorage.removeItem(this.STORAGE_KEY);
      
     }

    // excluir um usuario
    excluirUsuario(id: number){
      return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    
}
