import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@core/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private load: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.load.busy();
    return next.handle(request).pipe(
      finalize(() => {
        this.load.idle();
      })
    );
  }
}
