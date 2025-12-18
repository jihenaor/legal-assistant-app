import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { Message } from '../../../../core/models/message.model';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-message-item',
    standalone: true,
    imports: [CommonModule, MarkdownModule, ClipboardModule, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {
    @Input({ required: true }) message!: Message;
    isCopied = false;

    onCopy() {
        this.isCopied = true;
        setTimeout(() => this.isCopied = false, 2000);
    }
}
