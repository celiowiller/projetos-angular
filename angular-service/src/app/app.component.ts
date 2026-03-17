import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//importar o recursos necessarios
import { Produto } from './models/produto';
import { ProdutoService } from './services/produto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  //providers:[ProdutoService], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-service'

  // ------ a partir daqui, abaixo, vamos tentar "consumir" o conteudo do service, aqui, no componente

  // 1º passo: definir o titulo do componente
  tituloComp: string = 'Implementação do service' 

  // 2º passo: determinar a DI - injeção de dependencia
  private objService = inject(ProdutoService)

  // 3º passo: definir uma prop para receber como valro o conteudo que "vem" do service
  listandoProdutos: Produto[] = []

  // 4º passo: definir o hook ngOnInit para carregar, imediamente, após o "surgimento" do componente, a lista de produto na tela
  ngOnInit(): void {
      this.listandoProdutos = this.objService.obterLista()
  }



}



 /*

  //providers:[ProdutoService], // neste momento, ao referenciar a classe ProdutoService, dentro do array providers:[], estamos "tentando" tornar a classe - ProdutoService - num "provedor" de conteudo e funcionalidade para este componente; 
  
  // o array providers determina que: todo e qualquer recurso registrado dentro dele é, necessariamente, um provedor de conteudo e funcionalidade para o componente que o registra!
  // 1º passo: definir uma propriedade para receber como valor, posteriormente, o contexto da lista de produtos que temos
  listandoProdutos: Produto[] = []
  //objService: any
  meuService: any

  // 2º passo: definir o construtor da classe; e, na sequencia, acessar a prop listandoProdutos e "popular" o array inicial com os dados obtidos pelo service. temos de lembrar que:PARA QUE SEJA POSSIVEL USAR O SERVICE, PRECISAMOS DEFINIR A DI (Dependency Injection - Injeção de dependencia ) e a DI será - deve - ser definida no construtor da classe - a partir do uso do objeto referencial do service 
  constructor(private objService: ProdutoService){ // aqui, fizemos a mesma "coisa" que praticamos abaixo, mas seguimos uma indicação da doc oficial do Angular  
    // praticar a instancia da classe ProdutoService
      //this.objService = new ProdutoService() // aqui, a prop objService é a instrução de injeção de dependencia do service 
      //this.meuService = objService
  }

  // 3º passo: criar um método/função para que - através do uso da DI - possamos vincular o conteudo na view
  acessarListaProdutos(): void{
    this.listandoProdutos = this.objService.obterLista()
  }*/
