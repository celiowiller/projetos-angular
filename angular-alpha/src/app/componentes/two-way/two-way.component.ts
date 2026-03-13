import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way',
  imports: [FormsModule],
  templateUrl: './two-way.component.html',
  styleUrl: './two-way.component.css'
})
export class TwoWayComponent {
   // definir o titulo do componente
  tituloComp: string = 'Implementação Two-way binding'

  // estabelecer a prop que será vinculada na view
  algumValor: string = ''
}
