import { Routes } from '@angular/router';
import { LoginPageComponent } from '@app/pages/login-page/login-page';
import { DashboardComponent } from '@app/pages/dashboard/dashboard';
import { AnalyticsComponent } from '@app/pages/analytics/analytics.page';
import { authGuard } from '@app/guards/auth.guard';


export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
