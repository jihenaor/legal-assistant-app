import { Component, Input, ViewChild, ElementRef, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../../../core/models/message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [CommonModule, MessageItemComponent, MatProgressSpinnerModule],
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements AfterViewChecked, OnChanges {
    @Input({ required: true }) messages!: Message[];
    @Input() isLoading = false;

    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['messages']) {
            // Small timeout to allow DOM update
            setTimeout(() => this.scrollToBottom(), 100);
        }
    }

    ngAfterViewChecked(): void {
        // Optional: Only scroll if already at bottom or new message?
        // For now, aggressive scroll to bottom on view check if loading or active.
        // Better to do it mostly on messages change.
    }

    private scrollToBottom(): void {
        try {
            const el = this.scrollContainer.nativeElement;
            el.scrollTop = el.scrollHeight;
        } catch (err) { }
    }
}
