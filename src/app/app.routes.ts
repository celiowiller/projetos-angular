// abaixo, estamos importando o recurso necessario para criar rotas que serão 
// estabelecidas para a nagevação entre componentes
import { Routes } from '@angular/router';
import { InterpolationComponent } from './componentes/interpolation/interpolation.component';
import { PBindingComponent } from './componentes/p-binding/p-binding.component';
import { EBindingComponent } from './componentes/e-binding/e-binding.component';
import { TwoWayComponent } from './componentes/two-way/two-way.component';
import { DirIfComponent } from './componentes/dir-if/dir-if.component';
import { DirForComponent } from './componentes/dir-for/dir-for.component';
import { PipesComponent } from './componentes/pipes/pipes.component';


export const routes: Routes = [
    // aqui, serão compostas/estabelecidas cada uma das rotas que "apontam" para cada um  dos componentes do projeto

    // localhost:4200/interpolation
    {path: 'interpolation', component: InterpolationComponent},
    {path: 'p-binding', component: PBindingComponent},
    {path: 'e-binding', component: EBindingComponent},
    {path: 'two-way', component: TwoWayComponent},
    {path: 'dir-if', component: DirIfComponent},
    {path: 'dir-for', component: DirForComponent},
    {path: 'pipes', component: PipesComponent}
];
