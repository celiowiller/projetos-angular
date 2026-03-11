// importar recursos para a regionalização de moeda - a partir do pipe currency
import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common'; // para uso dos pipes é importante que o CommonModule  seja referenciado
// registerLocaleData: auxilia a definir o "registro regional" do componente

// importar o recurso de localidade especificamente na qual queremos "operar"
import localePt from '@angular/common/locales/pt'

// referenciar/acessar o método/função registerLocaleData() para regsitrar, devidamente, a região desejada - assim, o service vai atuar sobre a sigla intercional BRL
registerLocaleData(localePt, 'pt')


@Component({
  selector: 'app-pipes',
  imports: [CommonModule],
  // aqui, será indicado o uso do array providers:[]
  // estamos criando um array responsavel por definir qualquer service como um "provedor" de conteudo para este componente
  providers:[{
    provide: LOCALE_ID,
    useValue: 'pt'
  }],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.css'
})
export class PipesComponent {

  // definir o titulo do componente
  tituloComp: string = 'Implementação dos Pipes'

  // definir um conjunto de propriedades com valores distintos
  umTextoQualquer: string = 'TEXTO EM MAIUSCULO - PODE SER ALTERADO PARA MINUSCULO'
  valorFloat: number  = 978.55
  umaData: Date = new Date()

  //                             0      1      2      3      4      5      6    (-1)
  calendario: Array<string> = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] // a definição de tipo "embarcado" - porque o Typescript/Angular nos da o recurso Array que é genérico
  umOutroValor: number = 0.89

}


// operação de intervalo semi-aberto: [.....[ este conceito propõe que inclua-se o elemento da 1ª posição do subconjunto e exclua-se o elemento de ultima posição deste mesmo subconjunto