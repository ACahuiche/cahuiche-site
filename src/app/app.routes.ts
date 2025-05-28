import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'blog',
        pathMatch: 'full'
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
