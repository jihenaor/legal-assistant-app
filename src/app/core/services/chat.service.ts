import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRequest, ChatResponse } from '../models/chat-request.model';
// environment will be created next step, using direct URL for now or relative import if I'm confident. 
// I'll use the hardcoded URL first which satisfies the requirement, later refactor to environment if needed or just define const here.
// Requirement said "environment.ts: export const environment = ...". So I should use it.
// I will create environment files in next step, so I will import assuming it exists or will exist.
// To avoid compilation error before file exists, I will just use const here for now and TODO refactor, 
// OR I will create environment file in the same batch. I'll use const for now to be safe.

@Injectable({ providedIn: 'root' })
export class ChatService {
    private http = inject(HttpClient);
    // TODO: Move to environment
    private readonly apiUrl = 'https://takesolut.app.n8n.cloud/webhook/15260575-5acf-4be8-af96-ab49581cc599/chat';

    sendMessage(sessionId: string, message: string): Observable<ChatResponse> {
        const body: ChatRequest = {
            action: 'sendMessage',
            sessionId,
            chatInput: message
        };
        return this.http.post<ChatResponse>(this.apiUrl, body);
    }
}
