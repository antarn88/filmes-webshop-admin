import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService {

  constructor(
    private auth: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentAdmin = this.auth.currentAdminValue;

    if (currentAdmin && currentAdmin.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentAdmin.token}`,
          sessionId: currentAdmin.sessionId!,
        }
      });
    }

    return next.handle(request).pipe(tap(() => { },
      // Redirect to login page when the token expired
      async (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            await this.auth.logout(true);
          } else if (error.status === 403) {
            await this.auth.logout();
          } else {
            return;
          }
        }
      }));
  }
}
