import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Function-based interceptor
export const AuthInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const router = inject(Router); // Use Angular's DI to get the Router instance

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Redirect to login page if unauthorized
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
