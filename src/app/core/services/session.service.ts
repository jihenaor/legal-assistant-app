import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class SessionService {
    private readonly STORAGE_KEY = 'chat_session_id';
    sessionId = signal<string>('');

    constructor() {
        this.initializeSession();
    }

    private initializeSession() {
        let id = localStorage.getItem(this.STORAGE_KEY);
        if (!id) {
            id = uuidv4();
            localStorage.setItem(this.STORAGE_KEY, id);
        }
        this.sessionId.set(id);
    }

    getSessionId(): string {
        return this.sessionId();
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
