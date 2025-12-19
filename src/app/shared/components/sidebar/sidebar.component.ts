import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    @Input() collapsed = false;
    @Output() newChat = new EventEmitter<void>();
    @Output() toggleSidebar = new EventEmitter<void>();

    gpts = [
        'Creador de textos humanizados',
        'Creador de Historias IA',
        'Redactar prompts para crear...'
    ];

    onNewChat() {
        this.newChat.emit();
    }

    navigateToUpload() {
        this.router.navigate(['/upload']);
    }

    onToggle() {
        this.toggleSidebar.emit();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
