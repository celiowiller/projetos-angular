import { Component } from '@angular/core';

// 1º passo: importar a fonte de dados para que possamos praticar a vinculação destes mesmos dados na view
import { dadosFilmes, nomesColunas } from '../../fonteDados/dadosCompFor';

@Component({
  selector: 'app-dir-for',
  imports: [],
  templateUrl: './dir-for.component.html',
  styleUrl: './dir-for.component.css'
})
export class DirForComponent {
  // definir o titulo do componente
  tituloComp: string = 'Implementação diretiva @for'

  // definir uma nova prop que receb erá como valor a fonte de dados - nomesColunas - para vincular na view
  nomeandoColunas = nomesColunas

  // uma nova propriedade para receber como valor o conjunto de registros de filmes 
  listaDeFilmes = dadosFilmes

  // fazer uso da função auxiliar log() para observar o comportamento dos dados via console do browser
  constructor(){
    console.log(this.nomeandoColunas)
    console.log(this.listaDeFilmes)
  }
}
