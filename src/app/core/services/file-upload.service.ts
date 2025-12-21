import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface UploadProgress {
    status: 'progress' | 'complete';
    progress: number;
    fileId?: string;
    message?: string;
}

export interface UploadResponse {
    success: boolean;
    message: string;
    fileId: string;
}

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    private readonly UPLOAD_URL = 'https://takesolut.app.n8n.cloud/webhook-test/e10c4cf0-43b4-4f6d-af1e-412a59aa6bac';

    constructor(private http: HttpClient) {}

    uploadFile(file: File): Observable<UploadProgress> {
        const formData = new FormData();
        formData.append('data', file);
        formData.append('fileName', file.name);

        return this.http.post<UploadResponse>(this.UPLOAD_URL, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            map((event: HttpEvent<UploadResponse>) => {
                if (event.type === HttpEventType.UploadProgress && event.total) {
                    const progress = Math.round((100 * event.loaded) / event.total);
                    return { status: 'progress' as const, progress };
                } else if (event.type === HttpEventType.Response) {
                    const response = event.body;
                    return {
                        status: 'complete' as const,
                        progress: 100,
                        fileId: response?.fileId,
                        message: response?.message
                    };
                }
                return { status: 'progress' as const, progress: 0 };
            })
        );
    }
}
