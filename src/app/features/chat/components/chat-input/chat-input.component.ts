import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-chat-input',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
    @Input() disabled = false;
    @Output() send = new EventEmitter<string>();

    messageText = '';

    onSubmit() {
        if (this.messageText.trim() && !this.disabled) {
            this.send.emit(this.messageText.trim());
            this.messageText = '';
        }
    }

    onKeyDown(event: KeyboardEvent) {
        // Send on Enter, allow Shift+Enter for newline
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.onSubmit();
        }
    }
}
