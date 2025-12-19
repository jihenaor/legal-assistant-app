import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'chat',
        loadChildren: () => import('./features/chat/chat.routes').then(m => m.CHAT_ROUTES)
    },
    {
        path: 'upload',
        loadChildren: () => import('./features/file-upload/file-upload.routes').then(m => m.FILE_UPLOAD_ROUTES)
    }
];
