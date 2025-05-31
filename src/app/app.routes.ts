import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./portfolio/portfolio.component')
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
    },
    {
        path: 'blog',
        loadChildren: () => import('./blog/blog.routes')
    }
];
