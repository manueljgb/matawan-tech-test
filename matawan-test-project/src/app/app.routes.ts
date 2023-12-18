import { Routes } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';

export const routes: Routes = [
    { path: '', component: ReportListComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
