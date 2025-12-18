export interface ChatRequest {
    action: 'sendMessage';
    sessionId: string;
    chatInput: string;
}

export interface ChatResponse {
    output: string;
}
