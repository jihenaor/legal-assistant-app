import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Output() newChat = new EventEmitter<void>();

    gpts = [
        'Creador de textos humanizados',
        'Creador de Historias IA',
        'Redactar prompts para crear...'
    ];

    constructor(private router: Router) { }

    onNewChat() {
        this.newChat.emit();
    }

    navigateToUpload() {
        this.router.navigate(['/upload']);
    }
}
