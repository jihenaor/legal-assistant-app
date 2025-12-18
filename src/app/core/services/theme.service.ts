import { Injectable, signal, effect, Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private renderer: Renderer2;
    private readonly THEME_KEY = 'theme_mode';
    isDarkMode = signal<boolean>(false);

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme === 'dark') {
            this.isDarkMode.set(true);
        }

        effect(() => {
            if (this.isDarkMode()) {
                this.renderer.addClass(this.document.body, 'dark-mode');
                localStorage.setItem(this.THEME_KEY, 'dark');
            } else {
                this.renderer.removeClass(this.document.body, 'dark-mode');
                localStorage.setItem(this.THEME_KEY, 'light');
            }
        });
    }

    toggleTheme() {
        this.isDarkMode.update(curr => !curr);
    }
}
