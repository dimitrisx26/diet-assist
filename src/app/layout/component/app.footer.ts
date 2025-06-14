import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Made by 
        <a href="https://dxynos.com" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Dimitrios Xynos</a>
    </div>`
})
export class AppFooter {}
