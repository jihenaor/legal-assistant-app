import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = signal<boolean>(this.checkStoredAuth());

    private checkStoredAuth(): boolean {
        return localStorage.getItem('isAuthenticated') === 'true';
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated();
    }

    login(username: string, password: string): boolean {
        // Mock authentication - accept admin/admin
        if (username === 'admin' && password === 'admin') {
            this.isAuthenticated.set(true);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', username);
            return true;
        }
        return false;
    }

    logout(): void {
        this.isAuthenticated.set(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
    }

    getUsername(): string {
        return localStorage.getItem('username') || '';
    }
}
