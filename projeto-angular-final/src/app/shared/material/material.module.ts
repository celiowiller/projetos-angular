// este é o nosso arquivo "centralizador" de recursos do material design
// nós precisamos importar cada recurso - de sua propria origem - e registra-los como recursos disponiveis para os componentes
// import { Mat.....Module }
import { MatButtonModule } from '@angular/material/button'; // btões do componente
import { MatCardModule } from '@angular/material/card'; // cards para exibir o conteudo de produtos
import { MatInputModule } from '@angular/material/input';// definição de campos de tela 
import { MatFormFieldModule } from '@angular/material/form-field'; // container que "abriga" a estrutura do formulario
import { MatIconModule } from '@angular/material/icon'; // estrutura de iconização dos comps
import { MatToolbarModule } from '@angular/material/toolbar'; // design da barra - superior - da view dos comps
import { MatTableModule } from '@angular/material/table'; // recurso de design de tabela
import { MatSnackBarModule } from '@angular/material/snack-bar'; // barra de feedback visual
import { MatSidenavModule } from '@angular/material/sidenav'; // recurso para menus - lateral/retratil
import { MatListModule } from '@angular/material/list'; // recurso para definir estruturas de lista

// precisamos "expor" estes recursos para os outros elementos do projeto
export const MaterialModule = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatTableModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule   
]


