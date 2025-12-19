import { Component, EventEmitter, Output, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-chat-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements AfterViewInit {
    @Input() disabled = false;
    @Output() send = new EventEmitter<string>();
    @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

    messageText = '';

    ngAfterViewInit() {
        this.adjustTextareaHeight();
    }

    onSubmit() {
        if (this.messageText.trim() && !this.disabled) {
            this.send.emit(this.messageText.trim());
            this.messageText = '';
            setTimeout(() => this.adjustTextareaHeight(), 0);
        }
    }

    onKeyDown(event: KeyboardEvent) {
        // Send on Enter, allow Shift+Enter for newline
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.onSubmit();
        }
    }

    onInput() {
        this.adjustTextareaHeight();
    }

    private adjustTextareaHeight() {
        if (this.textareaRef) {
            const textarea = this.textareaRef.nativeElement;
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }
    }
}
