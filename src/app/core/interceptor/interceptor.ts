import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";



export const Interceptor: HttpInterceptorFn = (req, next) => {
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);
    const token = localStorage.getItem('token');
    let clonedRequest = req;

    if (token) {
        clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            const isLoginRequest = req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register');
            if (error.status === 401 && !isLoginRequest) {
                snackBar.open('Session expired, please login again', 'Close', {
                    duration: 5000,
                    panelClass: ['error-snackbar']
                });
                localStorage.removeItem('token');
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};
