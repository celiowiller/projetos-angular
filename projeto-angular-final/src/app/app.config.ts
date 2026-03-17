import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// precisamos importar o recurso que vai nos auxiliar a construir as requisições http necessarias
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient()
  ]
};

// HttpClientModule -angular V16 - importado e registrado no arquivo app.module.ts no array imports;

// HttpClientModule - angular V17 - era necessario fazer o registro no componente standalone;

// HttpClientModuleXXXXXX - esta modalidade de uso do recursos foi depreciada

// provideHttpClient - angular V18 - que pede que registremos no arquivo app.config.ts o "factory" HttpClient como um "provedor" de recursos para as requisições http - esta inicializado e disponivel
