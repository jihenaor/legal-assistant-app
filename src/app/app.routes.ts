import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'chat',
        loadChildren: () => import('./features/chat/chat.routes').then(m => m.CHAT_ROUTES),
        canActivate: [authGuard]
    },
    {
        path: 'upload',
        loadChildren: () => import('./features/file-upload/file-upload.routes').then(m => m.FILE_UPLOAD_ROUTES),
        canActivate: [authGuard]
    }
];
