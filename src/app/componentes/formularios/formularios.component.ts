// DEFINIÇÃO DE MODEL DRIVEN FORM: controlar todas as ações que ocorrem com o formulario a partir da camada lógica do componente

import { Component, OnInit } from '@angular/core'; // OnInit - interface: seu proposito é auxiliar no seguinte contexto: "priorizar" qualquer conteudo que possa surgir na tela - assim que o componente estiver "vivo", ou seja, quando o componente estiver "presente/carregado" na tela
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// importar o model
import { dadosForm } from '../../models/dadosForm';

// FormGroup: é a classe que auxiliará no controle geral do comnportamento do formulario

// FormControl: é a classe que auxiliará no controle individual de cada input do formulario 

// Validators: é a classe que auxiliará na criação e aplicação de validadores de dados que serão recebidos pelo form
// ReactiveFormsModule: recurso/modulo que possibilita ao formulario se tornar um elemento de view um "pouco mais dinamico" - ou seja, é possivel,  a partir das estruturas de controle, fazer com que o formulario "responda" a qualqer ateração de seus "inputs"


@Component({
  selector: 'app-formularios',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css'
})
export class FormulariosComponent implements OnInit{

  /// titulo do componente
  tituloComp: string = 'Implementação do Model Driven Form'

  // definir 3 propriedades - fundamentais - para se tornarem instrumentos de controle do formulario
  //dadosForm: any // esta será a propriedade que exercerá o controle geral do formulario - se tornando um objeto da classe FormGroup
  dadosForm!: FormGroup

  //propNome: any // esta será a prop que receberá um valor - seja ele qual for - para vincualr na view
  propNome!: string

  propEmail!: string

  // definição, abaixo, do Angular Hook ngOnInit - implementação de método com origem na interface OnInit
  ngOnInit(): void{
    // abaixo, fazemos uso da propriedades dadosForm para "assumir" o papel  de controlador geral do formulario. Para isso, instanciamos a classe FormGroup() e, agora, precisamos definir os objetos de controle individual que serão aplicados a cada "pedaço" do formulario
    this.dadosForm = new FormGroup({
      // nesta passo, vamos definir as estruturas de controle individual
      
      // 1º passo: estrutura de controle individual para o input nome; fazendo parte da instancia de FormContol,ja podemos aplicar algumas validações
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),

      // 2º estrutura de controle: controlar o input de email
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      // 3º estrutura de controle: controlar o input de password
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })

   
  }

  // definir um novo método par exibir os dados na tela
  exibirDados(umDado: dadosForm): void{
    this.propNome = umDado.nome
    this.propEmail = umDado.email
  }
}




  /*
  // definir o titulo do componente
  tituloComp: string = 'Implementação template Drive/Form'

  // definir o método/função que receberá os dados obtidos a partir do formulario - definido na view
  dadosRecebidos(dadosChegando: dadosForm): void{
     // fazer uso da função log() para observar o dados que chegaram
     console.log(dadosChegando)

    // definir uma let para manipular os dados recebidos do formulario
    let exibicao: string = 'O nome informado é: ' + dadosChegando.nome + '\n'

    // agora, nós acessar a variavel e concatena-la a mais um valor 
    exibicao += ' e o email inserido é este: ' + dadosChegando.email   

    // exibir numa janela de alert
    alert(exibicao)


  }*/