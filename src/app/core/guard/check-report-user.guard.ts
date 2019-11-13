import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CheckUserReportGuard implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        this.auth.user$.subscribe(val => {
            if (val['userReport']) {
                this.router.navigateByUrl('page-report');
            }
            return true
        })
        return true
    }
}
