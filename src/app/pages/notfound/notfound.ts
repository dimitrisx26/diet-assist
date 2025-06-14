import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
    template: ` <app-floating-configurator />
        <div class="flex items-center justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4 w-16 shrink-0 mx-auto">
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
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                        <span class="text-primary font-bold text-3xl">404</span>
                        <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">Not Found</h1>
                        <div class="text-surface-600 dark:text-surface-200 mb-8">Requested resource is not available.</div>
                        <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-table !text-2xl"></i>
                            </span>
                            <span class="ml-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">Frequently Asked Questions</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Ultricies mi quis hendrerit dolor.</span>
                            </span>
                        </a>
                        <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-question-circle !text-2xl"></i>
                            </span>
                            <span class="ml-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Solution Center</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Phasellus faucibus scelerisque eleifend.</span>
                            </span>
                        </a>
                        <a routerLink="/" class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-unlock !text-2xl"></i>
                            </span>
                            <span class="ml-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Permission Manager</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Accumsan in nisl nisi scelerisque</span>
                            </span>
                        </a>
                        <p-button label="Go to Dashboard" routerLink="/" />
                    </div>
                </div>
            </div>
        </div>`
})
export class Notfound {}
