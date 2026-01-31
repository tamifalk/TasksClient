import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { catchError, finalize, throwError } from "rxjs";
import { NotificationService } from "../service/notification-service";
import { LoadingService } from "../service/loading-service";



export const Interceptor: HttpInterceptorFn = (req, next) => {
    const notify = inject(NotificationService);
    const loadingService = inject(LoadingService);
    const router = inject(Router);
    loadingService.show();
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
        finalize(() => {
            loadingService.hide(); 
        }),
        catchError((error: HttpErrorResponse) => {
            const isAuthRequest = req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register');

            if (error.status === 401 && !isAuthRequest) {
                notify.showError('Session expired, please login again.');
                localStorage.removeItem('token');
                router.navigate(['/login']);
            }

            else if (error.status === 0) {
                notify.showError('Server is unreachable. Check your internet connection.');
            }

            else if (error.status === 500) {
                notify.showError('Something went wrong on our end. Please try again later.');
            }

            return throwError(() => error);
        })
    );
};
