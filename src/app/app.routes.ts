import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./blog/components/post-list/post-list.component')
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
