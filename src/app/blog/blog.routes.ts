import { Routes } from "@angular/router";
import { privateGuard } from '../core/guards/auth.guard'

export default [
    {
        path: '',
        loadComponent: () => import('./components/main/main.component')
    },
    {
        canActivate: [privateGuard],
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component')
    },
    {
        canActivate: [privateGuard],
        path: 'admin',
        loadComponent: () => import('./components/admin/admin.component')
    },
    {
        canActivate: [privateGuard],
        path: 'new-post',
        loadComponent: () => import('./components/post-form/post-form.component')
    },
    {
        canActivate: [privateGuard],
        path: 'edit-post/:idPost',
        loadComponent: () => import('./components/post-form/post-form.component')
    },
    {
        path: 'article/:idPost',
        loadComponent: () => import('./components/post-detail/post-detail.component')
    }
] as Routes