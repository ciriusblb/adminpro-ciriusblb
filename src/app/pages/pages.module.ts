import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; 

// modules
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

// routes
import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';

//componentes personalizados
import { ImcrementadorComponent } from '../components/imcrementador/imcrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    ImcrementadorComponent,
    GraficoDonaComponent,
    AccoutSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent
  ]
})
export class PagesModule { }
