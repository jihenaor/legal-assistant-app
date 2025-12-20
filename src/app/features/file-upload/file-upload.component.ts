import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FileUploadService } from '../../core/services/file-upload.service';

interface UploadFile {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'success' | 'error';
    error?: string;
    fileId?: string;
}

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent, SidebarComponent],
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
    files = signal<UploadFile[]>([]);
    isDragging = signal(false);

    private readonly ALLOWED_TYPES = ['application/pdf', 'application/zip', 'application/x-zip-compressed'];
    private readonly MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    constructor(
        private fileUploadService: FileUploadService,
        private router: Router
    ) {}

    goBack() {
        this.router.navigate(['/chat']);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging.set(true);
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging.set(false);
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging.set(false);

        const droppedFiles = event.dataTransfer?.files;
        if (droppedFiles) {
            this.handleFiles(Array.from(droppedFiles));
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.handleFiles(Array.from(input.files));
            input.value = ''; // Reset input
        }
    }

    private handleFiles(fileList: File[]) {
        const validFiles = fileList.filter(file => this.validateFile(file));

        const uploadFiles: UploadFile[] = validFiles.map(file => ({
            file,
            progress: 0,
            status: 'pending'
        }));

        this.files.update(current => [...current, ...uploadFiles]);
    }

    private validateFile(file: File): boolean {
        if (!this.ALLOWED_TYPES.includes(file.type)) {
            alert(`Archivo no permitido: ${file.name}. Solo se permiten PDF y ZIP.`);
            return false;
        }

        if (file.size > this.MAX_FILE_SIZE) {
            alert(`Archivo muy grande: ${file.name}. Máximo 50MB.`);
            return false;
        }

        return true;
    }

    removeFile(index: number) {
        this.files.update(current => current.filter((_, i) => i !== index));
    }

    uploadFiles() {
        const pendingFiles = this.files().filter(f => f.status === 'pending');

        pendingFiles.forEach((uploadFile, index) => {
            this.uploadSingleFile(uploadFile, this.files().indexOf(uploadFile));
        });
    }

    private uploadSingleFile(uploadFile: UploadFile, index: number) {
        // Update status to uploading
        this.files.update(current => {
            const updated = [...current];
            updated[index] = { ...updated[index], status: 'uploading' };
            return updated;
        });

        this.fileUploadService.uploadFile(uploadFile.file).subscribe({
            next: (uploadProgress) => {
                if (uploadProgress.status === 'progress') {
                    this.files.update(current => {
                        const updated = [...current];
                        updated[index] = { ...updated[index], progress: uploadProgress.progress };
                        return updated;
                    });
                } else if (uploadProgress.status === 'complete') {
                    this.files.update(current => {
                        const updated = [...current];
                        updated[index] = {
                            ...updated[index],
                            status: 'success',
                            progress: 100,
                            fileId: uploadProgress.fileId
                        };
                        return updated;
                    });
                    console.log('Archivo subido exitosamente:', uploadProgress.fileId);
                }
            },
            error: (error) => {
                console.error('Error al subir archivo:', error);
                this.files.update(current => {
                    const updated = [...current];
                    updated[index] = {
                        ...updated[index],
                        status: 'error',
                        error: error.message || 'Error al subir archivo'
                    };
                    return updated;
                });
            }
        });
    }

    get hasFilesToUpload(): boolean {
        return this.files().some(f => f.status === 'pending');
    }

    get isUploading(): boolean {
        return this.files().some(f => f.status === 'uploading');
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}
