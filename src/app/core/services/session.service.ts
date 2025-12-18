import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class SessionService {
    private readonly STORAGE_KEY = 'chat_session_id';
    sessionId = signal<string>(this.getSessionId());

    constructor() { }

    getSessionId(): string {
        const id = localStorage.getItem(this.STORAGE_KEY);
        if (!id) {
            return this.generateSessionId();
        }
        return id;
    }

    generateSessionId(): string {
        const newId = uuidv4();
        localStorage.setItem(this.STORAGE_KEY, newId);
        this.sessionId.set(newId);
        return newId;
    }

    resetSession(): void {
        this.generateSessionId();
    }
}
