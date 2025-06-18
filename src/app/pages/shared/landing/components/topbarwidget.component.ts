import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
    template: `<a class="flex items-center" href="#">
            <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-16 shrink-0 mx-auto">
                <g transform="translate(0.000000,150.000000) scale(0.100000,-0.100000)" fill="var(--primary-color)" stroke="none">
                    <path
                        d="M1074 1428 c14 -145 -34 -280 -136 -382 -72 -72 -133 -103 -263 -136
-118 -31 -179 -58 -240 -109 l-50 -41 -3 315 -2 315 -35 0 -35 0 0 -415 0
-415 35 0 c32 0 35 3 45 41 21 79 80 149 155 188 22 11 90 34 150 52 181 52
265 105 351 221 73 100 112 246 98 370 l-7 58 -35 0 -35 0 7 -62z"
                    />
                    <path
                        d="M675 1310 c-25 -27 -22 -80 6 -102 68 -56 154 27 103 100 -20 29 -83
31 -109 2z"
                    />
                    <path
                        d="M850 775 c-323 -90 -620 -428 -620 -706 l0 -51 32 7 c18 4 33 8 34 9
1 0 6 37 12 80 46 338 501 684 775 590 63 -21 115 -82 142 -165 19 -61 22 -64
54 -67 l34 -3 -7 54 c-12 110 -64 185 -161 234 -64 33 -209 42 -295 18z"
                    />
                </g>
            </svg>
            <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20">Diet Assist</span>
        </a>

        <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:!hidden" pStyleClass="@next" enterClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
            <i class="pi pi-bars !text-2xl"></i>
        </a>

        <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'home' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'features' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Features</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'highlights' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Highlights</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'pricing' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span>Pricing</span>
                    </a>
                </li>
            </ul>
            <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                <button pButton pRipple label="Login" routerLink="/auth/login" [rounded]="true" [text]="true"></button>
                <button pButton pRipple label="Register" routerLink="/auth/login" [rounded]="true"></button>
            </div>
        </div> `
})
export class TopbarWidget {
    constructor(public router: Router) {}
}
