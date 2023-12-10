import { Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportFullViewComponent } from './report-full-view/report-full-view.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: ReportListComponent },
    { path: 'report/:id', component: ReportFullViewComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];
