import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-page-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
    @Input() title: string = '';
    @Input() showBackButton: boolean = true;
    @Output() back = new EventEmitter<void>();

    onBack() {
        this.back.emit();
    }
}
