import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { HistoryComponent } from './pages/history/history.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { subscribedGuard } from './guards/subscribed.guard';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'converter',
                component: ConverterComponent,
                canActivate: [subscribedGuard]
            },
            {
                path: 'history',
                component: HistoryComponent,
                canActivate: [authGuard]
            },
            {
                path: 'subscriptions',
                component: SubscriptionsComponent,
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [notAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [notAuthGuard]
    },
];