import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment.dev';

export const devOnlyGuard: CanActivateFn = () => {
    const router = inject(Router);
    
    if (!environment.production) {
        return true;
    }
    
    router.navigate(['/']);
    return false;
};