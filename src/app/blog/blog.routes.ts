import { Routes } from "@angular/router";

export default [
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component')
    },
    {
        path: 'new-post',
        loadComponent: () => import('./components/post-form/post-form.component')
    },
    {
        path: 'edit-post/:idPost',
        loadComponent: () => import('./components/post-form/post-form.component')
    }
] as Routes