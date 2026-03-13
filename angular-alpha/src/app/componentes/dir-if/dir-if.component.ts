import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dir-if',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dir-if.component.html',
  styleUrl: './dir-if.component.css'
})

// diretiva estrutural @if: significa que a direta possui como caracteristica manipular  as estruturas de marcação/tags html *** toda a diretiva estrutural possui esta caracteristica

export class DirIfComponent {
  // definir a propriedade para ser o titulo do componente
  tituloComp: string = 'Implementação @if/ *ngIf'

  // definir uma prop que terá seu valor avaliado pela diretiva @if
  // inicialmente, esta prop não receberá valor inicial/especifico

  //  a instrução abaixo é o mesmo que esta aqui -> exiba: boolean | undefined
  //exiba!: boolean  // "obrigamos" o framework/linguagem (usando TS) a criar a prop para a classe

  idade: number = 18

}
