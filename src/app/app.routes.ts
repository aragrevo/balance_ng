import { Routes } from '@angular/router';
import { LoginPageComponent } from '@app/pages/login-page/login-page';
import { DashboardComponent } from '@app/pages/dashboard/dashboard';


export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardComponent },
    //   { path: 'analytics', component: AnalyticsComponent },
    { path: '**', redirectTo: '' }
];
