// aqui, SEMPRE É NECESSARIO FAZER AS IMPORTAÇÕES DOS RECURSOS NECESSARIOS PARA O FUNCIONAMENTO DO COMPONENTE

import { Component } from '@angular/core';  // este é o recurso necessário para "transformar" um arquivo/classe .ts - comum - num componente Angular

import { RouterOutlet, RouterLink } from '@angular/router'; // este recurso permite/possibilita, se necessario, estabelecer "rotas/caminhos/paths" para a navegação entre componentes do projeto

import { CommonModule } from '@angular/common'; // este recurso permite o uso de elementos padrão do angular, como, por exemplo: diretivas, formularios, entre outros 

// abaixo, temos o Decorator (na maioria das vezes indicado com o simbolo @) @Component
// este decorator diz que: "agora, a classe .ts é parte de um componente Angular"
@Component({
  selector: 'app-root', // esta é a propriedade - selector - que dá nome ao componente; seu nome é app-root


  imports: [RouterOutlet, RouterLink, CommonModule], // além de importar os recursos necessarios para o funcionamento do componente, alguns destes recursos precisam, tambem, serem "registrados" como "disponiveis para uso"; quais recursos precisam, na maioria das vezes, serem "registrados": os recursos de modulos de dependencia "modules"
  templateUrl: './app.component.html',// aqui esta o "endereço" do arquivo .html/template/view que pertence/compõe este componente
  styleUrl: './app.component.css' // aqui esta o endereço do arquivo .ccs que compõe este componente
})

export class AppComponent {

 // esta é uma variavel/propriedade/atributo/field/...
 // aqui, há uma operação extremamente simples: atribuição de um valor string à uma 
 // variavel.... 
  title = 'meu projeto angular';

}
