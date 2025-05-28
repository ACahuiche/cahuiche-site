import { Routes } from "@angular/router";
import { publicGuard } from '../core/guards/auth.guard'
import { registerAccessGuard } from "../core/guards/permits.guard";

export default [
    {
        canActivate: [publicGuard],
        path: 'login',
        loadComponent: () => import('./components/login/login.component')
    },
    {
        canActivate: [publicGuard, registerAccessGuard],
        path: 'register',
        loadComponent: () => import('./components/register/register.component')
    }
] as Routes