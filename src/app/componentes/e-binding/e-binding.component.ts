import { Component } from '@angular/core';

@Component({
  selector: 'app-e-binding',
  imports: [],
  templateUrl: './e-binding.component.html',
  styleUrl: './e-binding.component.css'
})
export class EBindingComponent {
  // definir o titulo do componente
  tituloComp: string = 'Implementação Event binding'

  // definir um método que será chamado à sua execução quando um evento for disparado - a partir da view

  // este binding determina que, na view, deva constar a chamada de determinado método.
  exibirAlerta(): void{
    // uso da função auxiliar log()
    console.log('Evento disparado...')

    // a informação, configurada abaixo, aparecerá numa janela de alerta  - na view
    alert('Um evento - a partir da view - foi disparado.')
  }
}
