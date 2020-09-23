import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import 'hammerjs';
import {
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatTooltipModule,
  MatCheckboxModule, MatSidenavModule,MatListModule,MatMenuModule,MatToolbarModule,MatExpansionModule, MatStepperIntl
} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {GridsterModule} from '../lib/gridster.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import{RouterModule,Routes,Router} from'@angular/router'
import { SliderModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { WindowModule } from '@progress/kendo-angular-dialog';

import {AppComponent} from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HistogramGraphComponent } from './histogram-graph/histogram-graph.component';
import { Tableservice } from './shared/services/table.service';
import { CListService } from './shared/services/CListService.service';
import { SharedService } from './shared/services/SharedService.service';
import { ScatterGraphService } from './shared/services/ScatterGraph.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableReusingDataItemsComponent } from './table-reusing-data-items/table-reusing-data-items.component';
import { ReportNiceEditComponent } from './report-nice-edit/report-nice-edit.component';
import { clusterTable } from 'app/shared/services/clusterTable.service';
import { SessionPageComponent } from './session-page/session-page.component';
import { FilterPipe } from './shared/Pipes/FilterPipe';
import { SessionsService } from 'app/shared/services/sessions.service';
import { ClustersService } from 'app/shared/services/clusters.service';
import { TimeAngleGraph500KComponent } from './time-angle-graph500-k/time-angle-graph500-k.component';
import { MapComponent } from './map/map.component';
import { TableFromServerComponent } from './table-from-server/table-from-server.component';
import { SharedServiceMapTableGraphs } from './shared/services/SharedServiceMapTableGraphs.service';
import { PopUpDialogComponent } from './pop-up-dialog/pop-up-dialog.component';
import { ActivityGraphComponent } from './activity-graph/activity-graph.component';


const appRouts:Routes=[{path:'dashboard',component:DashboardComponent},
{path:'',component:DashboardComponent}]
@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    HistogramGraphComponent,
    DashboardComponent,
    TableReusingDataItemsComponent,
    ReportNiceEditComponent,
    SessionPageComponent,
    FilterPipe,
    TimeAngleGraph500KComponent,
    MapComponent,
    TableFromServerComponent,
    PopUpDialogComponent,
    ActivityGraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,HttpModule,HttpClientModule, HttpClientJsonpModule,
    MatIconModule, MatButtonModule, MatSelectModule, MatInputModule, 
    MatTooltipModule, MatCheckboxModule, MatSidenavModule,MatListModule,
    MatMenuModule,MatToolbarModule,MatExpansionModule,
    GridsterModule, ExcelModule , DialogModule,
   ButtonsModule,GridModule,SliderModule,MatStepperModule,WindowModule,
   RouterModule.forRoot(appRouts, {useHash: true}),
  ],
  providers: [Tableservice,ScatterGraphService,CListService,SharedService
    ,ClustersService,clusterTable,SessionsService, MatStepperIntl,
    SharedServiceMapTableGraphs],
  bootstrap: [AppComponent]
})
export class AppModule {

}
