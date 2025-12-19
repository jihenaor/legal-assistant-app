import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username = '';
    password = '';
    errorMessage = '';

    constructor(private router: Router) { }

    onLogin() {
        // Mock authentication logic
        if (this.username && this.password) {
            // Simple mock check
            if (this.username === 'admin' && this.password === 'admin') {
                this.router.navigate(['/chat']);
            } else {
                // For the requested "sin validaciones" part, we might just let them in, 
                // but "mock de usuario" implies at least one valid user. 
                // I'll allow a specific one or maybe just any for now if they really meant *no* validation.
                // But "mock de un usuario" usually means "pretend there is a user".
                // Let's stick to the plan: simple check.
                this.errorMessage = 'Invalid credentials. Try admin/admin';
            }
        } else {
            this.errorMessage = 'Please enter username and password';
        }
    }
}
