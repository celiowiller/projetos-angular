import { Component } from '@angular/core';

@Component({
  selector: 'app-p-binding',
  imports: [],
  templateUrl: './p-binding.component.html',
  styleUrl: './p-binding.component.css'
})
export class PBindingComponent {
  // definir o titulo do comp
  tituloComp: string = 'Implementação Property binding'
  
  // definir uma nova propriedade para vincula-la na view
  umTexto: string = 'Texto da prop.'
}
