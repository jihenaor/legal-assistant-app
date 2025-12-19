import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';
import { SessionService } from '../../../../core/services/session.service';
import { Message } from '../../../../core/models/message.model';
import { ChatResponse } from '../../../../core/models/chat-request.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-chat-container',
    standalone: true,
    imports: [CommonModule, MessageListComponent, ChatInputComponent, SidebarComponent],
    templateUrl: './chat-container.component.html',
    styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {
    private chatService = inject(ChatService);
    private sessionService = inject(SessionService);

    messages = signal<Message[]>([]);
    isLoading = signal<boolean>(false);
    sidebarCollapsed = signal<boolean>(false);

    private readonly MOBILE_BREAKPOINT = 768;

    ngOnInit() {
        // Colapsar sidebar automáticamente en móvil
        if (window.innerWidth < this.MOBILE_BREAKPOINT) {
            this.sidebarCollapsed.set(true);
        }
    }

    handleSendMessage(text: string) {
        // Add user message
        const userMsg: Message = {
            id: uuidv4(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };
        this.messages.update(msgs => [...msgs, userMsg]);
        this.isLoading.set(true);

        // Call API
        this.chatService.sendMessage(this.sessionService.getSessionId(), text).subscribe({
            next: (res: ChatResponse) => {
                const assistantMsg: Message = {
                    id: uuidv4(),
                    role: 'assistant',
                    content: res.output,
                    timestamp: new Date()
                };
                this.messages.update(msgs => [...msgs, assistantMsg]);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Chat Error:', err);
                const errorMsg: Message = {
                    id: uuidv4(),
                    role: 'assistant',
                    content: '> [!WARNING]\n> **Error de conexión**\n> No pude conectar con el asistente. Por favor verifica tu internet o intenta de nuevo.',
                    timestamp: new Date()
                };
                this.messages.update(msgs => [...msgs, errorMsg]);
                this.isLoading.set(false);
            }
        });
    }

    handleNewChat() {
        this.sessionService.resetSession();
        this.messages.set([]);
    }

    handleToggleSidebar() {
        this.sidebarCollapsed.update(v => !v);
    }
}
