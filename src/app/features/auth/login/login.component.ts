import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    username = '';
    password = '';
    errorMessage = '';

    onLogin() {
        if (!this.username || !this.password) {
            this.errorMessage = 'Por favor ingresa usuario y contraseña';
            return;
        }

        if (this.authService.login(this.username, this.password)) {
            this.router.navigate(['/chat']);
        } else {
            this.errorMessage = 'Credenciales inválidas. Usa admin/admin';
        }
    }
}
