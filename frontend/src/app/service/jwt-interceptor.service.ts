import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService {

  constructor(
    private auth: AuthService
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

    return next.handle(request);
  }
}
